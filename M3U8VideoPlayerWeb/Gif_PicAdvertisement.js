
const enableAdAndVideo = (videoId, videoUrlId, adOverlayClass) => {
    const video = document.getElementById(videoId);
    const videoUrl = document.getElementById(videoUrlId).value;
    const gifAd = document.querySelector(`.${adOverlayClass} ins[data-revive-zoneid]`);
    const adOverlay = document.querySelector(`.${adOverlayClass}`);

    if (!video || !videoUrl || !gifAd || !adOverlay) {
        console.error('Required elements not found');
        return;
    }

    if (gifAd) {
        adOverlay.style.visibility = 'visible'; // Show the ad
    } else {
        console.error('Ad element not found');
    }

    video.style.visibility = 'visible'; // Ensure video is visible

    // Using HLS if supported
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        console.error('HLS not supported on this browser');
    }
};


const Delay = (videoId, videoUrlId, adOverlayClass) => {
    const video = document.getElementById(videoId);
    const videoUrl = document.getElementById(videoUrlId).value;
    const gifAd = document.querySelector(`.${adOverlayClass} ins[data-revive-zoneid]`);
    const adOverlay = document.querySelector(`.${adOverlayClass}`);

    if (!video || !videoUrl || !gifAd || !adOverlay) {
        console.error('Required elements not found');
        return;
    }

    if (gifAd) {
        adOverlay.style.visibility = 'visible'; // Show the ad
        hideAdOverlay(adOverlay); // Call the new function to hide the ad after 9 seconds
    } else {
        console.error('Ad element not found');
    }

    video.style.visibility = 'visible'; // Ensure video is visible

    // Using HLS if supported
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        console.error('HLS not supported on this browser');
    }
};
