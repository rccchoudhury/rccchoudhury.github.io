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

  <!-- More Works Dropdown -->
  <div class="more-works-container">
    <button class="more-works-btn" onclick="toggleMoreWorks()" title="View More Works from Our Lab">
      <i class="fas fa-flask"></i>
      More Works
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </button>
    <div class="more-works-dropdown" id="moreWorksDropdown">
      <div class="dropdown-header">
        <h4>More Works from Our Lab</h4>
        <button class="close-btn" onclick="toggleMoreWorks()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="works-list">
        <!-- TODO: Replace with your lab's related works -->
        <a href="https://arxiv.org/abs/PAPER_ID_1" class="work-item" target="_blank">
          <div class="work-info">
            <!-- TODO: Replace with actual paper title -->
            <h5>Paper Title 1</h5>
            <!-- TODO: Replace with brief description -->
            <p>Brief description of the work and its main contribution.</p>
            <!-- TODO: Replace with venue and year -->
            <span class="work-venue">Conference/Journal 2024</span>
          </div>
          <i class="fas fa-external-link-alt"></i>
        </a>
        <!-- TODO: Add more related works or remove extra items -->
        <a href="https://arxiv.org/abs/PAPER_ID_2" class="work-item" target="_blank">
          <div class="work-info">
            <h5>Paper Title 2</h5>
            <p>Brief description of the work and its main contribution.</p>
            <span class="work-venue">Conference/Journal 2023</span>
          </div>
          <i class="fas fa-external-link-alt"></i>
        </a>
        <a href="https://arxiv.org/abs/PAPER_ID_3" class="work-item" target="_blank">
          <div class="work-info">
            <h5>Paper Title 3</h5>
            <p>Brief description of the work and its main contribution.</p>
            <span class="work-venue">Conference/Journal 2023</span>
          </div>
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>

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
                <span class="link-block"><a href="http://arxiv.org/abs/2506.05301" target="_blank" class="external-link button is-normal is-rounded is-dark"><span class="icon"><i class="fas fa-file-pdf"></i></span><span>Paper</span></a></span>
                <span class="link-block"><a href="https://github.com/ByteDance-Seed/SeedVR" target="_blank" class="external-link button is-normal is-rounded is-dark"><span class="icon"><i class="fab fa-github"></i></span><span>Code</span></a></span>
                <span class="link-block"><a href="https://huggingface.co/datasets/Iceclear/SeedVR_VideoDemos/tree/main/seedvr2_videos" target="_blank" class="external-link button is-normal is-rounded is-dark"><span class="icon"><i class="fas fa-video"></i></span><span>Demos</span></a></span>
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
            <source src="/assets/sparsesr-assets/framework.mp4" type="video/mp4">
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

<!-- Visual Examples -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Visual Examples</h2>
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
<!-- End Visual Examples -->

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
          <img src="/assets/apt-template/static/images/social_preview.png" alt="Results figure placeholder" loading="lazy"/>
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
  url={https://rccchoudhury.github.io/apt}
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
