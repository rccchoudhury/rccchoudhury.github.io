---
layout: apt_project
permalink: /sparsesr/
title: Efficient Super-Resolution with Sparse Refinement
description: A new project page for SparseSR.
importance: 1
category: work
---


  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" onclick="scrollToTop()" title="Scroll to top" aria-label="Scroll to top">
    <i class="fas fa-chevron-up"></i>
  </button>


  <main id="main-content">
<section class="hero">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h1 class="title is-1 publication-title">SeedVR2: One-Step Video Restoration via Diffusion Adversarial Post-Training</h1>
            <div class="is-size-5 publication-authors">
              <span class="author-block"><a href="https://iceclear.github.io" target="_blank">Jianyi Wang</a>,</span>
              <span class="author-block"><a href="https://scholar.google.com/citations?user=EDWUw7gAAAAJ&hl=en" target="_blank">Shanchuan Lin</a>,</span>
              <span class="author-block"><a href="https://scholar.google.com/citations?user=xXMj6_EAAAAJ&hl=en" target="_blank">Zhijie Lin</a>,</span>
              <span class="author-block"><a href="https://scholar.google.com.hk/citations?user=C_6JH-IAAAAJ&hl=en" target="_blank">Yuxi Ren</a>,</span>
              <span class="author-block"><a href="https://openreview.net/profile?id=~Meng_Wei11" target="_blank">Meng Wei</a>,</span>
              <span class="author-block"><a href="https://zsyoaoa.github.io/" target="_blank">Zongsheng Yue</a>,</span>
              <span class="author-block"><a href="https://shangchenzhou.com/" target="_blank">Shangchen Zhou</a>,</span>
              <span class="author-block"><a href="https://haochen-rye.github.io/" target="_blank">Hao Chen</a>,</span>
              <span class="author-block"><a href="https://scholar.google.com/citations?user=uPmTOHAAAAAJ&hl=en" target="_blank">Yang Zhao</a>,</span>
              <span class="author-block"><a href="https://ceyuan.me/" target="_blank">Ceyuan Yang</a>,</span>
              <span class="author-block"><a href="https://scholar.google.com/citations?user=CVkM9TQAAAAJ&hl=en" target="_blank">XueFeng Xiao</a>,</span>
              <span class="author-block"><a href="https://www.mmlab-ntu.com/person/ccloy/index.html" target="_blank">Chen Change Loy</a>,</span>
              <span class="author-block"><a href="http://www.lujiang.info/" target="_blank">Lu Jiang</a></span>
            </div>
            <div class="column has-text-centered">
              <div class="publication-links">
                  <!-- Code Link -->
                  <span class="link-block">
                    <a href="" target="_blank" class="external-link button is-normal is-rounded is-dark">
                      <span class="icon">
                        <i class="fab fa-github"></i>
                      </span>
                      <span>Code</span>
                    </a>
                  </span>
                  <!-- arXiv Link -->
                  <span class="link-block">
                    <a href="" target="_blank" class="external-link button is-normal is-rounded is-dark">
                      <span class="icon">
                        <i class="ai ai-arxiv"></i>
                      </span>
                      <span>arXiv</span>
                    </a>
                  </span>
                  <!-- Hugging Face Link -->
                  <span class="link-block">
                    <a href="" target="_blank" class="external-link button is-normal is-rounded is-dark">
                      <span class="icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                          <path d="M20.25 15a3.75 3.75 0 0 1-3.75 3.75H7.5A3.75 3.75 0 0 1 3.75 15V12a3.75 3.75 0 0 1 3.75-3.75h9A3.75 3.75 0 0 1 20.25 12Z"></path>
                          <path d="M9.43 8.34c.45-1.33 1.83-2.2 3.32-1.95 1.7.29 2.95 1.79 2.66 3.49"></path>
                          <path d="M14.57 15.66c-.45 1.33-1.83 2.2-3.32 1.95-1.7-.29-2.95-1.79-2.66-3.49"></path>
                        </svg>
                      </span>
                      <span>Hugging Face</span>
                    </a>
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>


<!-- Teaser video-->
<section class="hero teaser">
  <div class="container is-max-desktop">
    <div class="hero-body">
        <video poster="/assets/sparsesr-assets/framework.png" id="tree" autoplay controls muted loop height="100%" preload="metadata">
            <source src="{{ '/assets/sparsesr-assets/framework.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
  </div>
</section>
<!-- End teaser video -->

<!-- Paper abstract -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths">
        <h2 class="title is-3">Abstract</h2>
        <div class="content has-text-justified">
          <!-- TODO: Replace with your paper abstract -->
          <p>
           We propose Adaptive Patch Transformers (APT), a method to accelerate vision
            transformers (ViTs) by using multiple different patch sizes within the same image.
            APT reduces the total number of input tokens by using larger patch sizes in more
            homogeneous image regions, and smaller patches in more complex ones. APT
            achieves a drastic speedup in ViT inference and training, reducing throguhput by
            40% on ViT-L and 50% on ViT-H while maintaining downstream performance. It
            can be applied to a previously fine-tuned ViT and converges in as little as 1 epoch,
            enabling training on high-resolution images with minimal compute budgets. It
            also significantly reduces training and inference time with no performance degra-
            dation on high-resolution dense visual tasks, achieving up to 30% faster training
            and inference on visual QA, object detection and semantic segmentation. We will
            release all code and trained models.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper abstract -->


<!-- Method Overview -->
<section class="hero is-small is-light">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Method Overview</h2>
      <div class="columns is-centered has-text-centered">
        <div class="column is-four-fifths">
          <div class="publication-video">
            <video poster="" id="method-video" controls muted loop height="100%" preload="metadata">
              <source src="/assets/apt-template/static/videos/carousel1.mp4" type="video/mp4">
            </video>
          </div>
          <div class="content has-text-justified">
            <p>
              An animated overview of our method.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End Method Overview -->

<!-- Examples -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Examples</h2>
      <div id="results-carousel" class="carousel results-carousel">
       <div class="item">
        <!-- TODO: Replace with your research result images -->
        <img src="/assets/apt-template/static/images/carousel1.jpg" alt="First research result visualization" loading="lazy"/>
        <!-- TODO: Replace with description of this result -->
        <h2 class="subtitle has-text-centered">
          First image description.
        </h2>
      </div>
      <div class="item">
        <!-- Your image here -->
        <img src="/assets/apt-template/static/images/carousel2.jpg" alt="Second research result visualization" loading="lazy"/>
        <h2 class="subtitle has-text-centered">
          Second image description.
        </h2>
      </div>
      <div class="item">
        <!-- Your image here -->
        <img src="/assets/apt-template/static/images/carousel3.jpg" alt="Third research result visualization" loading="lazy"/>
        <h2 class="subtitle has-text-centered">
         Third image description.
       </h2>
     </div>
     <div class="item">
      <!-- Your image here -->
      <img src="/assets/apt-template/static/images/carousel4.jpg" alt="Fourth research result visualization" loading="lazy"/>
      <h2 class="subtitle has-text-centered">
        Fourth image description.
      </h2>
    </div>
  </div>
</div>
</div>
</section>
<!-- End Examples -->

<!-- Results -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths">
        <h2 class="title is-3">Results</h2>
        <div class="content has-text-justified">
          <p>
            Here we show the relative speed-up from our method.
          </p>
          <img src="/assets/apt-template/static/images/carousel1.jpg" alt="Results visualization" loading="lazy"/>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End Results -->





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
      <pre id="bibtex-code"><code>@inproceedings{choudhury2026apt,
  title={Accelerating Vision Transformers With Adaptive Patch Sizes},
  author={Rohan Choudhury and Jung Eun Kim and Jinhyung Park and Eunho Yang and L{\'a}szl{\'o} A. Jeni and Kris M. Kitani},
  booktitle={International Conference on Learning Representations},
  year={2026},
  url={/apt/}
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
