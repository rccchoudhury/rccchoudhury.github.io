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
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
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
                const videos = this.el.querySelectorAll('video');
                videos.forEach(video => {
                    video.pause();
                });

                // Play the video in the active slide
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.currentTime = 0;
                        video.play().catch(function(error) {
                            console.log("Video play failed:", error);
                        });
                    }
                }
            },
            init: function() {
                // Play the first video on init
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        video.play().catch(function(error) {
                            console.log("Video play failed:", error);
                        });
                    }
                }
            }
        }
    };

    // Initialize Kinetics carousel
    const kineticsCarousel = new Swiper('.kinetics-carousel', swiperConfig);
    
    // Initialize SSv2 carousel
    const ssv2Carousel = new Swiper('.ssv2-carousel', swiperConfig);

    // Initialize teaser carousel
    const teaserCarousel = new Swiper('.teaser-carousel', {
        ...swiperConfig,
        effect: 'fade',  // Add fade transition for smoother video switching
        fadeEffect: {
            crossFade: true
        }
    });
});