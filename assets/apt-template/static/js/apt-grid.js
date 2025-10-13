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
    // Carousel buttons inside the root
    const prevBtn = root.querySelector('.apt-nav-prev');
    const nextBtn = root.querySelector('.apt-nav-next');
    // Short-side controls (global in controls panel)
    const shortSideRange = document.getElementById('apt-short-side-range');
    const shortSideValue = document.getElementById('apt-short-side-value');
    // Stats overlay elements
    const statsSize = document.getElementById('apt-stats-size');
    const statsTokens = document.getElementById('apt-stats-tokens');

    // Image list for carousel navigation
    const imageList = [
      '/assets/apt-template/static/images/carousel1.jpg',
      '/assets/apt-template/static/images/carousel2.jpg',
      '/assets/apt-template/static/images/carousel3.jpg',
      '/assets/apt-template/static/images/carousel4.jpg'
    ];
    // Attempt to infer current index from src
    let currentIndex = 0;
    try {
      const cur = img.getAttribute('src') || '';
      const found = imageList.findIndex(p => cur.endsWith(p));
      if (found >= 0) currentIndex = found;
    } catch {}
    // Preload images
    imageList.forEach(src => { const i = new Image(); i.src = src; });

    let patchSize = parseInt(range?.value || number?.value || '16', 10);
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

      // Draw grid in display coordinates
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';

      const step = Math.max(2, patchSize|0);

      ctx.beginPath();
      for (let x = 0; x <= w; x += step){
        const xx = Math.floor(x) + 0.5;
        ctx.moveTo(xx, 0);
        ctx.lineTo(xx, h);
      }
      for (let y = 0; y <= h; y += step){
        const yy = Math.floor(y) + 0.5;
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
      }
      ctx.stroke();

      // Emphasize bounds
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.strokeRect(0.5, 0.5, Math.floor(w)-1, Math.floor(h)-1);

      // Update stats overlay
      if (statsSize){
        statsSize.textContent = `${Math.round(w)}×${Math.round(h)}`;
      }
      if (statsTokens){
        const cols = Math.ceil(w / patchSize);
        const rows = Math.ceil(h / patchSize);
        const tokens = cols * rows;
        statsTokens.textContent = `${tokens} tokens (${cols}×${rows})`;
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

    range?.addEventListener('input', onInput);
    number?.addEventListener('input', onInput);

    // Resize handling using ResizeObserver for snappy updates
    const ro = new ResizeObserver(() => scheduleDraw());
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
      const current = parseInt(shortSideRange.value || String(snappedMax), 10);
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
    const onImgLoad = () => {
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
    prevBtn?.addEventListener('click', () => setImageByIndex(currentIndex - 1));
    nextBtn?.addEventListener('click', () => setImageByIndex(currentIndex + 1));

    // Short side handler (reactive)
    shortSideRange?.addEventListener('input', () => {
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
