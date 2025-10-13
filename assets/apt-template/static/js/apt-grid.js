(function(){
  'use strict';

  function $(sel, root=document){ return root.querySelector(sel); }

  function setupAPTGridDemo(root){
    const img = $('.apt-img', root);
    const canvas = $('.apt-grid-canvas', root);
    const ctx = canvas.getContext('2d');
    // Controls live outside the figure; select by ID globally
    const range = document.getElementById('apt-base-size-range');
    const number = document.getElementById('apt-base-size-number');
    // Carousel buttons inside the root
    const prevBtn = root.querySelector('.apt-nav-prev');
    const nextBtn = root.querySelector('.apt-nav-next');

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
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h){
        canvas.width = w;
        canvas.height = h;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    }

    function draw(){
      rafPending = false;
      setCanvasSize();
      const rect = img.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Grid style (white lines)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';

      // Align lines to 0.5 to reduce anti-alias blur for 1px lines
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

      // Optional: emphasize image bounds
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.strokeRect(0.5, 0.5, Math.floor(w)-1, Math.floor(h)-1);
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
      scheduleDraw();
    }

    range?.addEventListener('input', onInput);
    number?.addEventListener('input', onInput);

    // Resize handling using ResizeObserver for snappy updates
    const ro = new ResizeObserver(() => scheduleDraw());
    ro.observe(img);
    ro.observe(root);

    // Redraw when image loads (important for initial sizing)
    const onImgLoad = () => scheduleDraw();
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

    // Initial
    patchSize = snapToStep8(patchSize);
    syncControls(patchSize);
    scheduleDraw();

    // Expose minimal API for future multi-size overlays
    return {
      setBasePatchSize(size){
        patchSize = Math.max(2, size|0);
        syncControls(patchSize);
        scheduleDraw();
      }
    };
  }

  // Auto-init on DOMContentLoaded for any .apt-grid-demo
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.apt-grid-demo').forEach(setupAPTGridDemo);
  });
})();
