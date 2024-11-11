window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Function to handle video playback
    function handleVideoPlayback(swiper) {
        // Pause all videos
        const allVideos = document.querySelectorAll('.swiper video');
        allVideos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        // Play the video in the active slide
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            const video = activeSlide.querySelector('video');
            if (video) {
                video.play().catch(function(error) {
                    console.log("Video play failed:", error);
                });
            }
        }
    }

    // Common Swiper configuration
    const swiperConfig = {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function() {
                handleVideoPlayback(this);
            },
            slideChange: function() {
                handleVideoPlayback(this);
            }
        }
    };

    // Initialize all swipers
    const kineticsSwiper = new Swiper('.kinetics-swiper', swiperConfig);
    const ssv2Swiper = new Swiper('.ssv2-swiper', swiperConfig);
    const resultsSwiper = new Swiper('.results-swiper', swiperConfig);

    // Add click handlers for videos
    document.querySelectorAll('.swiper video').forEach(video => {
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
});