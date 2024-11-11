window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // Ensure video autoplay works
    const video = document.querySelector('video');
    if (video) {
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
            // Add a play button if autoplay fails
            video.setAttribute('controls', 'controls');
        });
    }
});