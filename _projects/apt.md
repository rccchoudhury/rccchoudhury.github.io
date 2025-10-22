---
layout: apt_project
permalink: /apt/
title: Accelerating Vision Transformers with Adaptive Patch Sizes
img: /assets/apt-template/static/images/social_preview.png
description: A new project page for apt.
importance: 1
category: work
---

  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" onclick="scrollToTop()" title="Scroll to top" aria-label="Scroll to top">
    <i class="fas fa-chevron-up"></i>
  </button>


  <main id="main-content">
  <section class="hero is-small">
    <div class="hero-body" style="padding-top:0.9rem; padding-bottom:0.55rem;">
      <div class="container is-max-desktop">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <!-- TODO: Replace with your paper title -->
            <h1 class="title is-2 publication-title" style="font-family:'Roboto', Inter, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif; font-weight:400; letter-spacing:0.1px; line-height:1.05; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:0.2rem;">Accelerating Vision Transformers With Adaptive Patch Sizes</h1>
            <div class="is-size-6 publication-authors" style="font-family:'Roboto', Inter, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif; font-size:1.12rem; margin-bottom:0.15rem;">
              <!-- TODO: Replace with your paper authors and their personal links -->
              <span class="author-block">
                <a>Rohan Choudhury*</a><sup>1</sup>,</span>
              <span class="author-block">
                <a>Jung Eun Kim*</a><sup>2,3</sup>,</span>
              <span class="author-block">
                <a>Jinhyung Park</a><sup>1</sup>,
              </span>
                <span class="author-block">
                <a>Eunho Yang</a><sup>2</sup>,
              </span>
                <span class="author-block">
                <a>László A. Jeni</a><sup>1</sup>,
              </span>
                <span class="author-block">
                <a>Kris M. Kitani</a><sup>1</sup>
              </span>
            </div>
            <div class="is-size-6 publication-authors" style="font-family:'Roboto', Inter, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif; font-size:1.0rem; margin-top:0.05rem; margin-bottom:0.15rem;">
              <!-- TODO: Replace with your institution and conference/journal info -->
              <span class="author-block"><sup>1</sup>Carnegie Mellon University, <sup>2</sup>KAIST, <sup>3</sup>General Robotics</span>
              <!-- TODO: Remove this line if no equal contribution -->
              <span class="eql-cntrb"><small><br><sup>*</sup>Indicates Equal Contribution</small></span>
            </div>
            <div class="column has-text-centered">
              <div class="publication-links" style="margin-top:0.15rem; margin-bottom:0.15rem; display:inline-flex; align-items:center; gap:0.3rem;">
  <!-- Code Link -->
  <span class="link-block">
    <a href="" target="_blank" class="external-link button is-rounded is-dark" style="padding:0.35rem 0.65rem; line-height:1.1;">
      <span class="icon">
        <i class="fab fa-github"></i>
      </span>
      <span>Code</span>
    </a>
  </span>
  <!-- arXiv Link -->
  <span class="link-block">
    <a href="https://arxiv.org/abs/2510.18091" target="_blank" class="external-link button is-rounded is-dark" style="padding:0.35rem 0.65rem; line-height:1.1;">
      <span class="icon">
        <i class="ai ai-arxiv"></i>
      </span>
      <span>arXiv</span>
    </a>
  </span>
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- Teaser video (positioned below banner, above abstract) -->
<section class="hero teaser">
  <div class="container is-fluid" style="max-width:1400px; margin:0 auto;">
    <div class="hero-body" style="padding-bottom: 1.25rem;">
      <div class="columns is-vcentered">
        <div class="column">
          <video id="apt-video-standard" autoplay controls muted loop style="width:100%; aspect-ratio:16 / 9; height:auto; border-radius:8px;" preload="metadata">
            <source src="/assets/apt-template/static/apt_vis_720p_5s_slow_16x16_grid.mp4" type="video/mp4">
          </video>
          <div class="has-text-centered" style="margin-top:0.15rem; font-size: 0.65rem; line-height:1.05; color:#666;">
            <span>Source video: <a href="https://www.youtube.com/watch?v=ekr2nIex040" target="_blank" rel="noopener">https://www.youtube.com/watch?v=ekr2nIex040</a></span>
          </div>
          <div class="has-text-centered" style="margin-top:0.5rem; font-weight:600;">Standard Patches</div>
        </div>
        <div class="column">
          <video id="apt-video-ours" autoplay controls muted loop style="width:100%; aspect-ratio:16 / 9; height:auto; border-radius:8px;" preload="metadata">
            <source src="/assets/apt-template/static/apt_vis_720p_5s_slow.mp4?v=2" type="video/mp4">
          </video>
          <div class="has-text-centered" style="margin-top:0.15rem; font-size: 0.65rem; line-height:1.05; color:#666;">
            <span>Source video: <a href="https://www.youtube.com/watch?v=ekr2nIex040" target="_blank" rel="noopener">https://www.youtube.com/watch?v=ekr2nIex040</a></span>
          </div>
          <div class="has-text-centered" style="margin-top:0.5rem; font-weight:600;">APT (ours)</div>
        </div>
      </div>

      <div class="content has-text-centered" style="margin-top: 0.75rem;">
        <p style="margin-bottom: 0.25rem;">Standard ViT patchification compared to APT (ours) run frame-by-frame on a video. We dynamically allocate different patch sizes, significantly reducing the number of input tokens while incurring no loss on downstream tasks.</p>
      </div>

      <script>
        (function() {
          const std = document.getElementById('apt-video-standard');
          const ours = document.getElementById('apt-video-ours');

          if (!std || !ours) return;

          let ready = { std: false, ours: false };

          function tryStartTogether() {
            if (ready.std && ready.ours) {
              // Align to start
              try {
                std.currentTime = 0;
                ours.currentTime = 0;
              } catch (e) {}
              const p1 = std.play();
              const p2 = ours.play();
              if (p1 && p1.catch) p1.catch(() => {});
              if (p2 && p2.catch) p2.catch(() => {});
            }
          }

          std.addEventListener('loadeddata', () => { ready.std = true; tryStartTogether(); }, { once: true });
          ours.addEventListener('loadeddata', () => { ready.ours = true; tryStartTogether(); }, { once: true });

          // Mirror play/pause
          std.addEventListener('play', () => { if (ours.paused) ours.play().catch(() => {}); });
          ours.addEventListener('play', () => { if (std.paused) std.play().catch(() => {}); });

          std.addEventListener('pause', () => { if (!ours.paused) ours.pause(); });
          ours.addEventListener('pause', () => { if (!std.paused) std.pause(); });

          // Keep times roughly aligned on seek and timeupdate drift
          function syncTime(source, target) {
            if (!isFinite(source.duration) || !isFinite(target.duration)) return;
            const diff = Math.abs(source.currentTime - target.currentTime);
            if (diff > 0.08) { // small threshold to avoid thrashing
              target.currentTime = source.currentTime;
            }
          }

          std.addEventListener('seeking', () => syncTime(std, ours));
          ours.addEventListener('seeking', () => syncTime(ours, std));

          let lastSync = 0;
          function maybeDriftCorrect(now, src, dst) {
            if (now - lastSync > 300) { // every 300ms
              syncTime(src, dst);
              lastSync = now;
            }
          }
          std.addEventListener('timeupdate', () => maybeDriftCorrect(performance.now(), std, ours));
          ours.addEventListener('timeupdate', () => maybeDriftCorrect(performance.now(), ours, std));
        })();
      </script>
    </div>
  </div>
</section>

<!-- Paper abstract -->
<section class="section hero is-light" style="padding-top: 1rem;">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths">
        <h2 class="title is-3">Abstract</h2>
        <div class="content has-text-justified">
          <!-- TODO: Replace with your paper abstract -->
          <p>
           We propose Adaptive Patch Transformers (APT), a method to accelerate vision transformers (ViTs) by using multiple different patch sizes within the same image. APT reduces the total number of input tokens by using larger patch sizes in more homogeneous image regions, and smaller patches in more complex ones. APT achieves a drastic speedup in ViT inference and training, reducing throguhput by 40% on ViT-L and 50% on ViT-H while maintaining downstream performance. It can be applied to a previously fine-tuned ViT and converges in as little as 1 epoch, enabling training on high-resolution images with minimal compute budgets. It also significantly reduces training and inference time with no performance degradation on high-resolution dense visual tasks, achieving up to 30% faster training and inference on visual QA, object detection and semantic segmentation. We will release all code and trained models.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper abstract -->

<!-- Abstract video (separate wider section) -->
<section class="section" style="padding-top: 0.5rem; padding-bottom: 1.25rem;">
  <div class="container is-fluid" style="max-width: 1100px;">
    <h2 class="title is-4 has-text-centered" style="margin-bottom: 1rem;">Method Overview</h2>
    <div class="has-text-centered">
      {% include video.liquid path="/assets/videos/apt_animation.mp4" cache_bust=true controls=true muted=true loop=true width="100%" height="460" class="apt-abstract-video" %}
    </div>
  </div>
</section>

<!-- Interactive Demo -->
<section class="section apt-grid-section" id="interactive-demo">
  <div class="container is-fluid">
    <h2 class="title is-3">Interactive Demo</h2>
    <div class="apt-grid-panel">
      <!-- Demo Figure first (bigger image) -->
      <figure class="apt-figure apt-grid-demo">
        <button class="apt-nav-btn apt-nav-prev" type="button" aria-label="Previous image" title="Previous">
          <i class="fas fa-chevron-left"></i>
        </button>
        <img class="apt-img" src="/assets/apt-imgs/golden_gate3.jpg" alt="APT demo image">
        <canvas class="apt-grid-canvas"></canvas>
        <!-- Stats overlay -->
        <div class="apt-overlay">
          <span class="apt-chip"><strong>Size:</strong> <span id="apt-stats-size">—</span></span>
          <span class="apt-chip"><strong>Base Tokens:</strong> <span id="apt-stats-tokens">—</span></span>
          <span class="apt-chip"><strong>APT Tokens:</strong> <span id="apt-stats-apt-tokens">—</span></span>
        </div>
        <button class="apt-nav-btn apt-nav-next" type="button" aria-label="Next image" title="Next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </figure>

      <!-- Controls below image -->
      <div class="apt-controls box">
        <h3 class="title is-5">Options</h3>
        <div class="field" style="margin-bottom: 0.75rem;">
          <label class="label" style="margin-bottom:0.5rem">Short Side Size</label>
          <div class="field is-grouped is-align-items-center">
            <div class="control is-expanded">
              <input id="apt-short-side-range" class="slider is-fullwidth is-info" type="range" min="224" max="1024" step="16" value="512" aria-label="Short side size">
            </div>
            <div class="control">
              <span id="apt-short-side-value" class="tag is-light">512 px</span>
            </div>
          </div>
        </div>
        <div class="field apt-field">
          <label class="label" for="apt-base-size-range" style="margin-bottom:0">Base patch size</label>
        </div>
        <div class="field is-grouped is-align-items-center">
          <div class="control is-expanded">
            <input id="apt-base-size-range" class="slider is-fullwidth is-info" step="8" min="8" max="128" value="16" type="range" aria-label="Base patch size">
          </div>
          <div class="control">
            <input id="apt-base-size-number" class="input is-small" type="number" min="8" max="128" step="8" value="16" style="width:90px" aria-label="Base patch size number">
          </div>
        </div>
        <div class="field" style="margin-top: 0.75rem;">
          <label class="label" style="margin-bottom:0.5rem">Number of Scales</label>
          <div class="field is-grouped is-align-items-center" id="apt-num-scales-group">
            <label class="radio"><input type="radio" name="apt-num-scales" value="2" checked> 2</label>
            <label class="radio" style="margin-left:1rem"><input type="radio" name="apt-num-scales" value="3"> 3</label>
            <label class="radio" style="margin-left:1rem"><input type="radio" name="apt-num-scales" value="4"> 4</label>
          </div>
        </div>

        <div class="field" style="margin-top: 0.75rem;">
          <label class="label" style="margin-bottom:0.5rem">Entropy Thresholds (bits, multiples of 0.5)</label>
          <div class="content" style="margin-bottom:0.5rem; color:#666">For S scales, provide S−1 thresholds: largest→smaller.</div>
          <div id="apt-thresholds-wrap" class="apt-thresholds-wrap">
            <div class="field is-grouped is-align-items-center apt-thr" id="apt-threshold-row-s2">
              <div class="control"><span id="apt-threshold-size-s2" class="tag is-info is-light">—</span></div>
              <div class="control is-expanded">
                <input id="apt-threshold-range-s2" class="slider is-fullwidth is-info" type="range" min="0" max="10" step="0.5" value="5.0" aria-label="Threshold between largest and next">
              </div>
              <div class="control">
                <span id="apt-threshold-value-s2" class="tag is-light">5.0</span>
              </div>
            </div>
            <div class="field is-grouped is-align-items-center apt-thr" id="apt-threshold-row-s3" style="display:none;">
              <div class="control"><span id="apt-threshold-size-s3" class="tag is-info is-light">—</span></div>
              <div class="control is-expanded">
                <input id="apt-threshold-range-s3" class="slider is-fullwidth is-info" type="range" min="0" max="10" step="0.5" value="5.0" aria-label="Threshold between next and smaller">
              </div>
              <div class="control">
                <span id="apt-threshold-value-s3" class="tag is-light">5.0</span>
              </div>
            </div>
            <div class="field is-grouped is-align-items-center apt-thr" id="apt-threshold-row-s4" style="display:none;">
              <div class="control"><span id="apt-threshold-size-s4" class="tag is-info is-light">—</span></div>
              <div class="control is-expanded">
                <input id="apt-threshold-range-s4" class="slider is-fullwidth is-info" type="range" min="0" max="10" step="0.5" value="5.0" aria-label="Threshold between next and smaller">
              </div>
              <div class="control">
                <span id="apt-threshold-value-s4" class="tag is-light">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End Interactive Demo -->

<!-- Examples -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Examples - Object Detection</h2>
      <div id="results-carousel" class="carousel results-carousel">
       <!-- <div class="item">
        <img src="/assets/apt-template/static/images/det_img1.png" alt="Detection result 1" loading="lazy"/>
      </div> -->
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img2.png" alt="Detection result 2" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img3.png" alt="Detection result 3" loading="lazy"/>
     </div>
     <div class="item">
      <img src="/assets/apt-template/static/images/det_img4.png" alt="Detection result 4" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img5.png" alt="Detection result 5" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img6.png" alt="Detection result 6" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img7.png" alt="Detection result 7" loading="lazy"/>
      </div>
      <!-- <div class="item">
        <img src="/assets/apt-template/static/images/det_img8.png" alt="Detection result 8" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img9.png" alt="Detection result 9" loading="lazy"/>
      </div> -->
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img10.png" alt="Detection result 10" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/det_img11.png" alt="Detection result 11" loading="lazy"/>
      </div>
      <!-- <div class="item">
        <img src="/assets/apt-template/static/images/det_img12.png" alt="Detection result 12" loading="lazy"/>
      </div> -->
    </div>
  </div>
</div>
</section>
<!-- End Examples -->

<!-- Examples -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Examples - Semantic Segmentation</h2>
      <div id="results-carousel" class="carousel results-carousel">
       <div class="item">
        <img src="/assets/apt-template/static/images/seg_img1.png" alt="Segmentation result 1" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img2.png" alt="Segmentation result 2" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img3.png" alt="Segmentation result 3" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img4.png" alt="Segmentation result 4" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img5.png" alt="Segmentation result 5" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img6.png" alt="Segmentation result 6" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img7.png" alt="Segmentation result 7" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img8.png" alt="Segmentation result 8" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img9.png" alt="Segmentation result 9" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img10.png" alt="Segmentation result 10" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img11.png" alt="Segmentation result 11" loading="lazy"/>
      </div>
      <div class="item">
        <img src="/assets/apt-template/static/images/seg_img12.png" alt="Segmentation result 12" loading="lazy"/>
      </div>
    </div>
  </div>
  </div>
</section>
<!-- End Examples -->






<!--BibTex citation -->
  <section class="section" id="BibTeX">
    <div class="container is-max-desktop content">
      <div class="bibtex-header">
        <h2 class="title">BibTeX</h2>
        <button class="copy-bibtex-btn" onclick="copyBibTeX()" title="Copy BibTeX to clipboard">
          <i class="fas fa-copy"></i>
          <span class="copy-text">Copy</span>
        </button>
      </div>
      <pre id="bibtex-code"><code>@article{choudhury2025apt,
  title={Accelerating Vision Transformers with Adaptive Patch Sizes},
  author={Choudhury, Rohan and Kim, JungEun and Park, Jinhyung and Yang, Eunho and Jeni, L{\'a}szl{\'o} A. and Kitani, Kris M.},
  journal={arXiv preprint arXiv:2510.18091},
  year={2025},
  url={https://arxiv.org/abs/2510.18091},
  doi={10.48550/arXiv.2510.18091}
}</code></pre>
    </div>
</section>
<!--End BibTex citation -->


  <footer class="footer">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="content">

          <p>
            This page was built using the <a href="https://github.com/eliahuhorwitz/Academic-project-page-template" target="_blank">Academic Project Page Template</a> which was adopted from the <a href="https://nerfies.github.io" target="_blank">Nerfies</a> project page.
            You are free to borrow the source code of this website, we just ask that you link back to this page in the footer. <br> This website is licensed under a <a rel="license"  href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative
            Commons Attribution-ShareAlike 4.0 International License</a>.
          </p>

        </div>
      </div>
    </div>
  </div>
</footer>
