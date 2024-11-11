window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Common Swiper configuration
    const swiperConfig = {
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
                // Pause all videos in this swiper
                const videos = this.el.querySelectorAll('.swiper-slide video');
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
    };

    // Initialize all swipers
    const kineticsSwiper = new Swiper('.kinetics-swiper', swiperConfig);
    const ssv2Swiper = new Swiper('.ssv2-swiper', swiperConfig);
    const resultsSwiper = new Swiper('.results-swiper', {
        ...swiperConfig,
        slidesPerView: 1, // Show only one video at a time for the results section
    });
});