window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Initialize Swiper
    const swiper = new Swiper('.kinetics-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Pause all videos
                const videos = document.querySelectorAll('.swiper-slide video');
                videos.forEach(video => {
                    video.pause();
                });
                
                // Play the video in the active slide
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.play();
                    }
                }
            },
            init: function() {
                // Play the first video on init
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.play();
                    }
                }
            }
        }
    });

    bulmaSlider.attach();
})

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Initialize Swiper
    const swiper = new Swiper('.kinetics-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Pause all videos
                const videos = document.querySelectorAll('.swiper-slide video');
                videos.forEach(video => {
                    video.pause();
                });
                
                // Play the video in the active slide
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.play();
                    }
                }
            },
            init: function() {
                // Play the first video on init
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.play();
                    }
                }
            }
        }
    });

    bulmaSlider.attach();
})