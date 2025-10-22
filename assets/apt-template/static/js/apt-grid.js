(function(){
  'use strict';

  function $(sel, root=document){ return root.querySelector(sel); }

  function setupAPTGridDemo(root){
    const img = $('.apt-img', root);
    const gridCanvas = $('.apt-grid-canvas', root);
    const ctx = gridCanvas.getContext('2d');
    // Controls live outside the figure; select by ID globally
    const range = document.getElementById('apt-base-size-range');
    const number = document.getElementById('apt-base-size-number');
    const numScalesGroup = document.getElementById('apt-num-scales-group');
    // Threshold rows and sliders for S=2..4 (S-1 thresholds)
    const thrRows = {
      s2: document.getElementById('apt-threshold-row-s2'),
      s3: document.getElementById('apt-threshold-row-s3'),
      s4: document.getElementById('apt-threshold-row-s4'),
    };
    const thrRanges = {
      s2: document.getElementById('apt-threshold-range-s2'),
      s3: document.getElementById('apt-threshold-range-s3'),
      s4: document.getElementById('apt-threshold-range-s4'),
    };
    const thrValues = {
      s2: document.getElementById('apt-threshold-value-s2'),
      s3: document.getElementById('apt-threshold-value-s3'),
      s4: document.getElementById('apt-threshold-value-s4'),
    };
    // Carousel buttons inside the root
    const prevBtn = root.querySelector('.apt-nav-prev');
    const nextBtn = root.querySelector('.apt-nav-next');
    // Short-side controls (global in controls panel)
    const shortSideRange = document.getElementById('apt-short-side-range');
    const shortSideValue = document.getElementById('apt-short-side-value');
    // Stats overlay elements
    const statsSize = document.getElementById('apt-stats-size');
    const statsTokens = document.getElementById('apt-stats-tokens');
    const statsAptTokens = document.getElementById('apt-stats-apt-tokens');

    // Image list for carousel navigation
    const imageList = [
      '/assets/apt-imgs/golden_gate3.jpg',
      '/assets/apt-imgs/joshua_tree.jpg',
      '/assets/apt-imgs/lost_coast.jpg',
      '/assets/apt-imgs/mojave.jpg',
      '/assets/apt-imgs/palace.jpg',
      '/assets/apt-imgs/death_valley.jpg',
      '/assets/apt-imgs/blackboard.jpg',
      '/assets/apt-imgs/apt.jpg'
    ];
    // Attempt to infer current index from src
    let currentIndex = 0;
    try {
      const cur = img.getAttribute('src') || '';
      const found = imageList.findIndex(function(p) { return cur.endsWith(p); });
      if (found >= 0) currentIndex = found;
    } catch (e) {}
    // Preload images
    imageList.forEach(function(src) { const i = new Image(); i.src = src; });

    let patchSize = (function(){
      var v = (range && range.value) ? range.value : ((number && number.value) ? number.value : '16');
      return parseInt(v, 10);
    })();
    let rafPending = false;

    function setCanvasSize(){
      const rect = img.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      gridCanvas.style.width = rect.width + 'px';
      gridCanvas.style.height = rect.height + 'px';
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (gridCanvas.width !== w || gridCanvas.height !== h){
        gridCanvas.width = w;
        gridCanvas.height = h;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    }

    function draw(){
      rafPending = false;
      setCanvasSize();
      const rect = img.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Compute base grid dims and derive multi-scale sizes
      const base = Math.max(2, patchSize|0);
      const cols = Math.ceil(w / base);
      const rows = Math.ceil(h / base);
      const S = (function(){
        const checked = numScalesGroup ? numScalesGroup.querySelector('input[name="apt-num-scales"]:checked') : null;
        const v = parseInt((checked && checked.value) ? checked.value : '2', 10);
        return Math.max(2, Math.min(4, v));
      })();
      const patchSizes = Array.from({length: S}, function(_, i) { return base * Math.pow(2, i); }); // ascending
      const gridDims = patchSizes.map(function(ps) { return {
        ps: ps,
        cols: Math.ceil(w / ps),
        rows: Math.ceil(h / ps),
      }; });

      // Update threshold size labels (largest→smaller)
      // Mapping: s2 -> largest (index S-1), s3 -> next (S-2), s4 -> next (S-3)
      const lblS2 = document.getElementById('apt-threshold-size-s2');
      const lblS3 = document.getElementById('apt-threshold-size-s3');
      const lblS4 = document.getElementById('apt-threshold-size-s4');
      if (lblS2 && S >= 2) lblS2.textContent = patchSizes[S-1] + ' px';
      if (lblS3 && S >= 3) lblS3.textContent = patchSizes[S-2] + ' px';
      if (lblS4 && S >= 4) lblS4.textContent = patchSizes[S-3] + ' px';

      // Obtain a grayscale image at display size using an offscreen canvas
      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.round(w));
      off.height = Math.max(1, Math.round(h));
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, off.width, off.height);
      const imgData = octx.getImageData(0, 0, off.width, off.height);
      const rgba = imgData.data; // RGBA interleaved

      // Normalize image to [-1, 1] using mean=std=0.5 per channel, then compute luminance
      // r_n = (r/255 - 0.5)/0.5 = r/127.5 - 1
      // Map luminance in [-1,1] to [0,1] for binning
      const W = off.width, H = off.height;
      const bins = 512; // higher resolution entropy bins
      const maxEntropy = Math.log2(bins);
      const q = new Uint8Array(W * H);
      for (let i = 0, p = 0; i < rgba.length; i += 4, p++){
        const r = rgba[i], g = rgba[i+1], b = rgba[i+2];
        const rn = r / 127.5 - 1.0;
        const gn = g / 127.5 - 1.0;
        const bn = b / 127.5 - 1.0;
        const lumN = 0.2989*rn + 0.5870*gn + 0.1140*bn; // in [-1,1]
        let v01 = (lumN + 1.0) * 0.5; // [0,1]
        if (v01 < 0) v01 = 0; else if (v01 > 1) v01 = 1;
        const bin = Math.min(bins - 1, (v01 * bins) | 0);
        q[p] = bin;
      }

      // Build integral histograms only when bins are modest; otherwise fallback to direct per-patch histograms
      let useIntegral = bins <= 128;
      let stride = 0, planeSize = 0, integral = null;
      if (useIntegral){
        stride = (W + 1);
        planeSize = (H + 1) * (W + 1);
        integral = new Uint32Array(bins * planeSize);
        for (let y = 0; y < H; y++){
          const rowBase = y * W;
          const rowSum = new Uint32Array(bins);
          for (let x = 0; x < W; x++){
            const bin = q[rowBase + x];
            rowSum[bin]++;
            const outIdxBase = (y + 1) * stride + (x + 1);
            const prevRowBase = y * stride + (x + 1);
            for (let b = 0, plane = 0; b < bins; b++, plane += planeSize){
              integral[plane + outIdxBase] = integral[plane + prevRowBase] + rowSum[b];
            }
          }
        }
      }

      function rectCount(bin, x0, y0, x1, y1){
        const plane = bin * planeSize;
        const A = integral[plane + y0 * stride + x0];
        const B = integral[plane + y0 * stride + x1];
        const C = integral[plane + y1 * stride + x0];
        const D = integral[plane + y1 * stride + x1];
        return D - B - C + A;
      }

      // Compute entropy maps for all scales using the integral histograms
      const entropies = gridDims.map(function({rows, cols}) { return new Float32Array(rows * cols); });
      if (useIntegral){
        for (let i = 0; i < gridDims.length; i++){
          const {rows, cols} = gridDims[i];
          const arr = entropies[i];
          for (let r = 0; r < rows; r++){
            for (let c = 0; c < cols; c++){
              const x0 = c * gridDims[i].ps, y0 = r * gridDims[i].ps;
              const x1 = Math.min(x0 + gridDims[i].ps, W), y1 = Math.min(y0 + gridDims[i].ps, H);
              const area = (x1 - x0) * (y1 - y0) || 1;
              let Hsum = 0;
              for (let b = 0; b < bins; b++){
                const cnt = rectCount(b, x0, y0, x1, y1);
                if (cnt){
                  const p = cnt / area;
                  Hsum -= p * Math.log2(p);
                }
              }
              arr[r*cols + c] = Hsum;
            }
          }
        }
      } else {
        // Direct per-patch histogram counting for high bin counts
        for (let i = 0; i < gridDims.length; i++){
          const {rows, cols} = gridDims[i];
          const arr = entropies[i];
          for (let r = 0; r < rows; r++){
            for (let c = 0; c < cols; c++){
              const hist = new Uint16Array(bins);
              const x0 = c * gridDims[i].ps, y0 = r * gridDims[i].ps;
              const x1 = Math.min(x0 + gridDims[i].ps, W), y1 = Math.min(y0 + gridDims[i].ps, H);
              const area = (x1 - x0) * (y1 - y0) || 1;
              for (let y = y0; y < y1; y++){
                const baseIdx = y * W + x0;
                for (let x = x0; x < x1; x++){
                  hist[q[baseIdx + (x - x0)]]++;
                }
              }
              let Hsum = 0;
              for (let b = 0; b < bins; b++){
                const cnt = hist[b];
                if (cnt){
                  const p = cnt / area;
                  Hsum -= p * Math.log2(p);
                }
              }
              arr[r*cols + c] = Hsum;
            }
          }
        }
      }

      // Read thresholds in bits for S-1 levels (order: largest -> smaller)
      const thrBitsList = [];
      if (S >= 2) thrBitsList.push(Math.min(maxEntropy, Math.max(0, parseFloat((thrRanges.s2 && thrRanges.s2.value) ? thrRanges.s2.value : '5.0'))));
      if (S >= 3) thrBitsList.push(Math.min(maxEntropy, Math.max(0, parseFloat((thrRanges.s3 && thrRanges.s3.value) ? thrRanges.s3.value : '5.0'))));
      if (S >= 4) thrBitsList.push(Math.min(maxEntropy, Math.max(0, parseFloat((thrRanges.s4 && thrRanges.s4.value) ? thrRanges.s4.value : '5.0'))));
      // Update displayed values (snap to 0.5 step already enforced by input)
      if (thrValues.s2 && thrRanges.s2) thrValues.s2.textContent = parseFloat(thrRanges.s2.value).toFixed(1);
      if (thrValues.s3 && thrRanges.s3) thrValues.s3.textContent = parseFloat(thrRanges.s3.value).toFixed(1);
      if (thrValues.s4 && thrRanges.s4) thrValues.s4.textContent = parseFloat(thrRanges.s4.value).toFixed(1);

      // Create masks per scale (Uint8Array) and apply hierarchical non-overlap
      const masks = gridDims.map(function({rows, cols}) { return new Uint8Array(rows * cols); });
      // Smallest scale (index 0) defaults to 1 (selected)
      masks[0].fill(1);
      // For larger scales i=1..S-1: select where entropy < threshold_i (indexing thr over largest->smaller)
      for (let i = S-1; i >= 1; i--){
        const {rows, cols} = gridDims[i];
        const ent = entropies[i];
        var _tb = thrBitsList[(S-1) - i];
        const thrBits = (_tb === undefined || _tb === null) ? maxEntropy : _tb; // thresholds[0] -> largest (i=S-1)
        const mask = masks[i];
        for (let r = 0; r < rows; r++){
          for (let c = 0; c < cols; c++){
            mask[r*cols + c] = ent[r*cols + c] < thrBits ? 1 : 0;
          }
        }
      }
      // Upsample larger masks to clear smaller masks (non-overlapping)
      for (let i = S-1; i >= 1; i--){
        const {ps: psBig, rows: rBig, cols: cBig} = gridDims[i];
        for (let j = i-1; j >= 0; j--){
          const {ps: psSmall, rows: rSmall, cols: cSmall} = gridDims[j];
          const scale = Math.max(1, Math.floor(psBig / psSmall));
          for (let r = 0; r < rBig; r++){
            for (let c = 0; c < cBig; c++){
              if (!masks[i][r*cBig + c]) continue;
              const rs0 = r * scale;
              const cs0 = c * scale;
              const rs1 = Math.min(rSmall, rs0 + scale);
              const cs1 = Math.min(cSmall, cs0 + scale);
              for (let rr = rs0; rr < rs1; rr++){
                for (let cc = cs0; cc < cs1; cc++){
                  masks[j][rr*cSmall + cc] = 0;
                }
              }
            }
          }
        }
      }

      // Draw non-overlapping rectangles: largest -> smallest
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      for (let i = S-1; i >= 0; i--){
        const {ps, rows: rr, cols: cc} = gridDims[i];
        const mask = masks[i];
        for (let r = 0; r < rr; r++){
          for (let c = 0; c < cc; c++){
            if (!mask[r*cc + c]) continue;
            const x = c * ps + 0.5;
            const y = r * ps + 0.5;
            const ww = Math.min(ps, w - c*ps) - 1;
            const hh = Math.min(ps, h - r*ps) - 1;
            if (ww > 0 && hh > 0) ctx.strokeRect(x, y, Math.floor(ww), Math.floor(hh));
          }
        }
      }

      // Emphasize bounds
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.strokeRect(0.5, 0.5, Math.floor(w)-1, Math.floor(h)-1);

      // Update stats overlay
      if (statsSize){
        statsSize.textContent = Math.round(w) + '×' + Math.round(h);
      }
      if (statsTokens){
        const baseTokens = cols * rows;
        statsTokens.textContent = baseTokens + ' tokens (' + cols + '×' + rows + ')';
      }
      if (statsAptTokens){
        // APT tokens = sum over all selected patches across scales
        let aptTokens = 0;
        for (let i = 0; i < S; i++){
          const {rows: rr, cols: cc} = gridDims[i];
          const mask = masks[i];
          let count = 0;
          for (let k = 0; k < mask.length; k++) count += mask[k];
          aptTokens += count;
        }
        const baseTokens2 = cols * rows;
        const reduction = baseTokens2 > 0 ? Math.max(0, 1 - aptTokens / baseTokens2) : 0;
        const pct = Math.round(reduction * 100);
        statsAptTokens.innerHTML = aptTokens + ' tokens <span class="apt-green">-' + pct + '%</span>';
      }
    }

    function scheduleDraw(){
      if (!rafPending){
        rafPending = true;
        requestAnimationFrame(draw);
      }
    }

    function syncControls(val){
      if (range && range.value !== String(val)) range.value = String(val);
      if (number && number.value !== String(val)) number.value = String(val);
    }

    // Controls
    function snapToStep8(v){
      if (!isFinite(v)) return 16;
      const clamped = Math.max(8, Math.min(128, v));
      return Math.round(clamped / 8) * 8;
    }

    function onInput(e){
      const raw = parseInt(e.target.value, 10);
      const snapped = snapToStep8(raw);
      patchSize = snapped;
      syncControls(patchSize);
      // Keep short-side slider increments aligned to current patch size
      if (shortSideRange) {
        shortSideRange.step = String(patchSize);
        const snappedShort = snapToBase(parseInt(shortSideRange.value||'512',10), patchSize);
        if (String(snappedShort) !== shortSideRange.value) shortSideRange.value = String(snappedShort);
      }
      applyShortSide();
      scheduleDraw();
    }

    if (range) range.addEventListener('input', onInput);
    if (number) number.addEventListener('input', onInput);

    // Multi-scale UI helpers
    function updateThresholdRowsDisplay(){
      const checked = numScalesGroup ? numScalesGroup.querySelector('input[name="apt-num-scales"]:checked') : null;
      const S = Math.max(2, Math.min(4, parseInt((checked && checked.value) ? checked.value : '2', 10)));
      if (thrRows.s2) thrRows.s2.style.display = S >= 2 ? '' : 'none';
      if (thrRows.s3) thrRows.s3.style.display = S >= 3 ? '' : 'none';
      if (thrRows.s4) thrRows.s4.style.display = S >= 4 ? '' : 'none';
    }

    // Threshold sliders handlers (all trigger redraw)
    function onThrInput(){ scheduleDraw(); }
    if (thrRanges.s2) thrRanges.s2.addEventListener('input', onThrInput);
    if (thrRanges.s3) thrRanges.s3.addEventListener('input', onThrInput);
    if (thrRanges.s4) thrRanges.s4.addEventListener('input', onThrInput);

    // Number of scales handler (radio group)
    if (numScalesGroup) numScalesGroup.addEventListener('change', function() {
      updateThresholdRowsDisplay();
      scheduleDraw();
    });

    // Resize handling using ResizeObserver for snappy updates
    const ro = new ResizeObserver(function() { scheduleDraw(); });
    ro.observe(img);
    ro.observe(root);

    // Snap helpers
    function snapToBase(v, base){
      if (!isFinite(v)) return 512;
      const min = 224, max = 1024;
      const b = Math.max(1, base|0);
      const clamped = Math.max(min, Math.min(max, v));
      return Math.round(clamped / b) * b;
    }

    function snapDownToBase(v, base){
      if (!isFinite(v)) return 512;
      const min = 224, max = 1024;
      const b = Math.max(1, base|0);
      const clamped = Math.max(min, Math.min(max, v));
      return Math.floor(clamped / b) * b;
    }

    function updateShortSideBounds(){
      if (!shortSideRange) return;
      // Determine the image's natural short side
      const natShort = (img.naturalWidth && img.naturalHeight) ? Math.min(img.naturalWidth, img.naturalHeight) : 1024;
      // Snap max DOWN to the nearest multiple of patchSize, not exceeding natShort
      const snappedMax = Math.max(224, snapDownToBase(natShort, patchSize));
      shortSideRange.max = String(snappedMax);
      // Ensure the current value obeys new bounds and step increments
      const current = parseInt(shortSideRange.value||String(snappedMax), 10);
      let nextVal = Math.min(snappedMax, current);
      nextVal = snapToBase(nextVal, patchSize);
      if (String(nextVal) !== shortSideRange.value) shortSideRange.value = String(nextVal);
      if (shortSideValue) shortSideValue.textContent = nextVal + ' px';
    }

    // Apply short side sizing using the slider value
    function applyShortSide(){
      const raw = shortSideRange ? parseInt(shortSideRange.value, 10) : NaN;
      const val = snapToBase(raw, patchSize);
      if (shortSideValue) shortSideValue.textContent = val + ' px';

      if (img.naturalWidth && img.naturalHeight){
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        const short = Math.min(nw, nh);
        const scale = val / short;
        const targetW = Math.max(1, Math.round(nw * scale));
        // Height auto preserves aspect ratio
        img.style.width = targetW + 'px';
        img.style.height = 'auto';
      }
    }

    // Redraw when image loads (important for initial sizing)
    const onImgLoad = function() {
      // Default the slider to the image's short side snapped to current base
      if (shortSideRange && img.naturalWidth && img.naturalHeight){
        const short = Math.min(img.naturalWidth, img.naturalHeight);
        updateShortSideBounds();
        const snapped = snapToBase(short, patchSize);
        shortSideRange.value = String(snapped);
      }
      applyShortSide();
      scheduleDraw();
    };
    img.addEventListener('load', onImgLoad);
    if (img.complete) scheduleDraw();

    // Carousel handlers
    function setImageByIndex(idx){
      currentIndex = (idx % imageList.length + imageList.length) % imageList.length; // safe modulo
      const newSrc = imageList[currentIndex];
      if (img.getAttribute('src') !== newSrc){
        img.setAttribute('src', newSrc);
      } else {
        scheduleDraw();
      }
    }
    if (prevBtn) prevBtn.addEventListener('click', function() { setImageByIndex(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { setImageByIndex(currentIndex + 1); });

    // Short side handler (reactive)
    if (shortSideRange) shortSideRange.addEventListener('input', function() {
      // Snap slider UI to current base patch size increments for a discrete feel
      if (shortSideRange){
        const snapped = snapToBase(parseInt(shortSideRange.value,10), patchSize);
        if (String(snapped) !== shortSideRange.value) shortSideRange.value = String(snapped);
      }
      applyShortSide();
      scheduleDraw();
    });

    // Initial
    patchSize = snapToStep8(patchSize);
    syncControls(patchSize);
    // initialize short side step, bounds, tag, and sizing (default to current image short side)
    if (shortSideRange) shortSideRange.step = String(patchSize);
    updateShortSideBounds();
    if (shortSideRange && img.naturalWidth && img.naturalHeight){
      const short = Math.min(img.naturalWidth, img.naturalHeight);
      const snapped = snapToBase(short, patchSize);
      shortSideRange.value = String(snapped);
    }
    if (shortSideValue && shortSideRange) shortSideValue.textContent = snapToBase(parseInt(shortSideRange.value||'512',10), patchSize) + ' px';
    // Initialize thresholds UI display for multi-scale
    updateThresholdRowsDisplay();
    if (thrValues.s2 && thrRanges.s2) thrValues.s2.textContent = parseFloat(thrRanges.s2.value||'5.0').toFixed(1);
    if (thrValues.s3 && thrRanges.s3) thrValues.s3.textContent = parseFloat(thrRanges.s3.value||'5.0').toFixed(1);
    if (thrValues.s4 && thrRanges.s4) thrValues.s4.textContent = parseFloat(thrRanges.s4.value||'5.0').toFixed(1);
    scheduleDraw();

    // Expose minimal API for future multi-size overlays
    return {
      setBasePatchSize(size){
        patchSize = Math.max(2, size|0);
        syncControls(patchSize);
        if (shortSideRange) shortSideRange.step = String(patchSize);
        // Re-snap short-side slider to new base increment
        if (shortSideRange){
          const snapped = snapToBase(parseInt(shortSideRange.value||'512',10), patchSize);
          shortSideRange.value = String(snapped);
          updateShortSideBounds();
        }
        applyShortSide();
        scheduleDraw();
      }
    };
  }

  // Auto-init on DOMContentLoaded for any .apt-grid-demo
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.apt-grid-demo').forEach(setupAPTGridDemo);
  });
})();
