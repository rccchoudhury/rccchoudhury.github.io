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
  <section class="hero">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <!-- TODO: Replace with your paper title -->
            <h1 class="title is-1 publication-title">Accelerating Vision Transformers With Adaptive Patch Sizes</h1>
            <div class="is-size-5 publication-authors">
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
            <div class="is-size-5 publication-authors">
              <!-- TODO: Replace with your institution and conference/journal info -->
              <span class="author-block"><sup>1</sup>Carnegie Mellon University, <sup>2</sup>KAIST, <sup>3</sup>General Robotics<br>ICLR 2026 Submission</span>
              <!-- TODO: Remove this line if no equal contribution -->
              <span class="eql-cntrb"><small><br><sup>*</sup>Indicates Equal Contribution</small></span>
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
      <!-- TODO: Replace with your teaser video -->
      <video poster="" id="tree" autoplay controls muted loop height="100%" preload="metadata">
        <!-- TODO: Add your video file path here -->
        <source src="/assets/apt-template/static/videos/banner_video.mp4" type="video/mp4">
      </video>
      <!-- TODO: Replace with your video description -->
      <h2 class="subtitle has-text-centered">
        Aliquam vitae elit ullamcorper tellus egestas pellentesque. Ut lacus tellus, maximus vel lectus at, placerat pretium mi. Maecenas dignissim tincidunt vestibulum. Sed consequat hendrerit nisl ut maximus. 
      </h2>
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
           We propose Adaptive Patch Transformers (APT), a method to accelerate vision transformers (ViTs) by using multiple different patch sizes within the same image. APT reduces the total number of input tokens by using larger patch sizes in more homogeneous image regions, and smaller patches in more complex ones. APT achieves a drastic speedup in ViT inference and training, reducing throguhput by 40% on ViT-L and 50% on ViT-H while maintaining downstream performance. It can be applied to a previously fine-tuned ViT and converges in as little as 1 epoch, enabling training on high-resolution images with minimal compute budgets. It also significantly reduces training and inference time with no performance degradation on high-resolution dense visual tasks, achieving up to 30% faster training and inference on visual QA, object detection and semantic segmentation. We will release all code and trained models.
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
          <div class="publication-image">
            <img src="/assets/apt-template/static/images/apt_system.png" alt="Method overview" loading="lazy"/>
          </div>
          <div class="content has-text-justified">
            <p>
              An overview of our method.
            </p>
          </div>
          <div class="publication-image">
            <img src="/assets/apt-template/static/images/zeroconv.png" alt="Zero conv" loading="lazy"/>
          </div>
          <div class="content has-text-justified">
            <p>
              An overview of zero conv.
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
          <img src="/assets/apt-template/static/images/Table1.png" alt="Table 1" loading="lazy"/>
          <p>
            <b>Full Fine-Tuning on ImageNet.</b> APT significantly reduces the wall-clock time to fine-tune a pre-trained backbone on ImageNet with no degradation in accuracy. We use the MAE training recipe for all cases. Note that ViT-B is trained for 2× more epochs than ViT-L.
          </p>
          <img src="/assets/apt-template/static/images/Table2.png" alt="Table 2" loading="lazy"/>
          <p>
            <b>1-epoch Fine-Tuning on ImageNet.</b> APT consistently achieves large speedups while matching or sometimes exceeding the original network’s performance after fine-tuning for 1 more epoch. Compared to only random masking or only resizing, APT offers the best tradeoff between speed and accuracy.
          </p>
          <img src="/assets/apt-template/static/images/Figure4.png" alt="Figure 4" loading="lazy"/>
          <p>
            <b>Accuracy vs. Throughput under different compute budgets.</b> Comparison between APT and layer-level merging methods on ViT-L and ViT-H. For a fairer evaluation, we also include their re-implemented Advanced (Adv) versions with FlashAttention, shown with a dashed line. APT consistently outperforms the baselines in both throughput and accuracy across all compute budgets.
          </p>
          <img src="/assets/apt-template/static/images/Table3.png" alt="Table 3" loading="lazy"/>
          <p>
            <b>Transfer to VQA.</b> APT enables significant throughput increase while matching or exceeding performance to the baseline.
          </p>
          <img src="/assets/apt-template/static/images/Table4_5.png" alt="Table 4,5" loading="lazy"/>
          <p>
            <b>Transfer to Object Detection and Semantic Segmentation.</b> APT can be scaled to high-resolution dense image tasks supporting window attention. Also, APT can handle pixel-level fine-grained tasks without compromising visual acuity.
          </p>
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
