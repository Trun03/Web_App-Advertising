function End(videoId, videoUrlId, adOverlayId, skipButtonId, muteButtonId, muteIconId, pausePlayButtonId, pausePlayIconId) {
    const video = document.getElementById(videoId);
    const videoUrl = document.getElementById(videoUrlId).value;
    const zoneId = video ? video.getAttribute('data-value') : null;
    const adOverlay = document.getElementById(adOverlayId);
    const skipButton = document.getElementById(skipButtonId);
    const muteButton = document.getElementById(muteButtonId);
    const muteIcon = document.getElementById(muteIconId);
    const pausePlayButton = document.getElementById(pausePlayButtonId);
    const pausePlayIcon = document.getElementById(pausePlayIconId);

    if (!video || !zoneId) {
        console.error('Phần tử video hoặc thuộc tính data-value không tồn tại.');
        return;
    }

    let adsManager;
    let isAdPaused = false;

    muteButton.style.display = 'none';
    pausePlayButton.style.display = 'none';

    if (!videoUrl.endsWith('.m3u8')) {
        console.error('Vui lòng nhập một URL hợp lệ có đuôi .m3u8');
        return;
    }
    // khi video kết thúc
    video.addEventListener('ended', function() {
        displayAdOverlay(adOverlay, video, zoneId);
    });

    loadHLSVideo(videoUrl);

    function loadHLSVideo(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // For Safari
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            console.error('HLS không được hỗ trợ trên trình duyệt này');
        }
    }

    function displayAdOverlay(adOverlay, video, zoneId) {
        const adDisplayContainer = new google.ima.AdDisplayContainer(adOverlay, video);
        adDisplayContainer.initialize();

        const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = `http://adserver.ami.vn/www/delivery/fc.php?script=apVideo:vast2&zoneid=${zoneId}`;

        adsLoader.requestAds(adsRequest);

        adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(event) {
            adsManager = event.getAdsManager(video);
            adOverlay.style.display = 'flex';
            skipButton.style.display = 'none';
            muteButton.style.display = 'block';
            pausePlayButton.style.display = 'block';

            adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
            adsManager.setVolume(0);
            adsManager.start();

            adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, function() {
                adOverlay.style.display = 'none';
                skipButton.style.display = 'none';
                muteButton.style.display = 'none';
                pausePlayButton.style.display = 'none';
            });

            setTimeout(() => {
                skipButton.style.display = 'block';
            }, 10000);

            skipButton.addEventListener('click', function() {
                adsManager.stop();
                adOverlay.style.display = 'none';
                skipButton.style.display = 'none';
                muteButton.style.display = 'none';
                pausePlayButton.style.display = 'none';
            });

            muteButton.addEventListener('click', function() {
                const currentVolume = adsManager.getVolume();
                if (currentVolume === 0) {
                    adsManager.setVolume(1);
                    muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/speaker.png";
                } else {
                    adsManager.setVolume(0);
                    muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/mute.png";
                }
            });
        });

        adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(event) {
            console.error('Lỗi quảng cáo:', event.getError());
            adOverlay.style.display = 'none';
        });

        pausePlayButton.addEventListener('click', function() {
            if (adsManager) {
                if (isAdPaused) {
                    adsManager.resume();
                    pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/pause.png";
                    isAdPaused = false;
                } else {
                    adsManager.pause();
                    pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/play.png";
                    isAdPaused = true;
                }
            }
        });
    }
}

function initializeAdPlayer(videoId, videoUrlId, adOverlayId, skipButtonId, muteButtonId, muteIconId, pausePlayButtonId, pausePlayIconId) {
    const video = document.getElementById(videoId);
    const videoUrl = document.getElementById(videoUrlId).value;
    const zoneId = video ? video.getAttribute('data-value') : null;
    const adOverlay = document.getElementById(adOverlayId);
    const skipButton = document.getElementById(skipButtonId);
    const muteButton = document.getElementById(muteButtonId);
    const muteIcon = document.getElementById(muteIconId);
    const pausePlayButton = document.getElementById(pausePlayButtonId);
    const pausePlayIcon = document.getElementById(pausePlayIconId);

    if (!video || !zoneId) {
        console.error('Phần tử video hoặc thuộc tính data-value không tồn tại.');
        return;
    }

    let adsManager;
    let isAdPaused = false;

    muteButton.style.display = 'none';
    pausePlayButton.style.display = 'none';
    if (!videoUrl.endsWith('.m3u8')) {
        console.error('Vui lòng nhập một URL hợp lệ có đuôi .m3u8');
        return;
    }

    const adDisplayContainer = new google.ima.AdDisplayContainer(adOverlay, video);
    adDisplayContainer.initialize();

    const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = `http://adserver.ami.vn/www/delivery/fc.php?script=apVideo:vast2&zoneid=${zoneId}`;

    adsLoader.requestAds(adsRequest);

    adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(event) {
        adsManager = event.getAdsManager(video);
        adOverlay.style.display = 'flex';
        skipButton.style.display = 'none';
        muteButton.style.display = 'block';
        pausePlayButton.style.display = 'block';

        adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
        adsManager.setVolume(0);
        adsManager.start();

        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, function() {
            adOverlay.style.display = 'none';
            skipButton.style.display = 'none';
            muteButton.style.display = 'none';
            pausePlayButton.style.display = 'none';

            loadHLSVideo(videoUrl);
        });

        setTimeout(() => {
            skipButton.style.display = 'block';
        }, 10000);

        skipButton.addEventListener('click', function() {
            adsManager.stop();
            adOverlay.style.display = 'none';
            skipButton.style.display = 'none';
            muteButton.style.display = 'none';
            pausePlayButton.style.display = 'none';
            loadHLSVideo(videoUrl);
        });

        muteButton.addEventListener('click', function() {
            const currentVolume = adsManager.getVolume();
            if (currentVolume === 0) {
                adsManager.setVolume(1);
                muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/speaker.png";
            } else {
                adsManager.setVolume(0);
                muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/mute.png";
            }
        });
    });

    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(event) {
        console.error('Lỗi quảng cáo:', event.getError());
        adOverlay.style.display = 'none';
        loadHLSVideo(videoUrl);
    });

    pausePlayButton.addEventListener('click', function() {
        if (adsManager) {
            if (isAdPaused) {
                adsManager.resume();
                pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/pause.png";
                isAdPaused = false;
            } else {
                adsManager.pause();
                pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/play.png";
                isAdPaused = true;
            }
        }
    });
    function loadHLSVideo(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);  
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Đối với Safari (HLS được hỗ trợ natively trong Safari)
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            console.error('HLS không được hỗ trợ trên trình duyệt này');
        }
    }

}


function displayAdAfterDelay(video, adOverlay, adsLoader, adsRequest, delay) {
    setTimeout(() => {
        video.pause();  // Pause the main video at the 10-second mark
        adOverlay.style.display = 'flex';
        adsLoader.requestAds(adsRequest);  // Request the ad
    }, delay);
}

function Delay(videoId, videoUrlId, adOverlayId, skipButtonId, muteButtonId, muteIconId, pausePlayButtonId, pausePlayIconId, delay) {
    const video = document.getElementById(videoId);
    const videoUrl = document.getElementById(videoUrlId).value;
    const zoneId = video ? video.getAttribute('data-value') : null;
    const adOverlay = document.getElementById(adOverlayId);
    const skipButton = document.getElementById(skipButtonId);
    const muteButton = document.getElementById(muteButtonId);
    const muteIcon = document.getElementById(muteIconId);
    const pausePlayButton = document.getElementById(pausePlayButtonId);
    const pausePlayIcon = document.getElementById(pausePlayIconId);

    if (!video || !zoneId) {
        console.error('Phần tử video hoặc thuộc tính data-value không tồn tại.');
        return;
    }

    let adsManager;
    let isAdPaused = false;

    muteButton.style.display = 'none';
    pausePlayButton.style.display = 'none';

    if (!videoUrl.endsWith('.m3u8')) {
        console.error('Vui lòng nhập một URL hợp lệ có đuôi .m3u8');
        return;
    }

    // Load the main video URL and start playing
    loadHLSVideo(videoUrl);

    const adDisplayContainer = new google.ima.AdDisplayContainer(adOverlay, video);
    adDisplayContainer.initialize();

    const adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = `http://adserver.ami.vn/www/delivery/fc.php?script=apVideo:vast2&zoneid=${zoneId}`;

    // Call displayAdAfterDelay to show the ad after the specified delay
    displayAdAfterDelay(video, adOverlay, adsLoader, adsRequest, delay);

    adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(event) {
        adsManager = event.getAdsManager(video);
        adOverlay.style.display = 'flex';
        skipButton.style.display = 'none';
        muteButton.style.display = 'block';
        pausePlayButton.style.display = 'block';

        adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
        adsManager.setVolume(0);
        adsManager.start();

        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, function() {
            adOverlay.style.display = 'none';
            skipButton.style.display = 'none';
            muteButton.style.display = 'none';
            pausePlayButton.style.display = 'none';

            video.play();  // Resume main video playback after ad completes
        });

        setTimeout(() => {
            skipButton.style.display = 'block';
        }, 10000);

        skipButton.addEventListener('click', function() {
            adsManager.stop();
            adOverlay.style.display = 'none';
            skipButton.style.display = 'none';
            muteButton.style.display = 'none';
            pausePlayButton.style.display = 'none';
            video.play();  // Resume main video playback if ad is skipped
        });

        muteButton.addEventListener('click', function() {
            const currentVolume = adsManager.getVolume();
            if (currentVolume === 0) {
                adsManager.setVolume(1);
                muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/speaker.png";
            } else {
                adsManager.setVolume(0);
                muteIcon.src = "https://img.icons8.com/ios-filled/50/000000/mute.png";
            }
        });
    });

    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(event) {
        console.error('Lỗi quảng cáo:', event.getError());
        adOverlay.style.display = 'none';
        video.play();  // Resume main video playback if there's an ad error
    });

    pausePlayButton.addEventListener('click', function() {
        if (adsManager) {
            if (isAdPaused) {
                adsManager.resume();
                pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/pause.png";
                isAdPaused = false;
            } else {
                adsManager.pause();
                pausePlayIcon.src = "https://img.icons8.com/ios-filled/50/000000/play.png";
                isAdPaused = true;
            }
        }
    });

    function loadHLSVideo(url) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);  
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            console.error('HLS không được hỗ trợ trên trình duyệt này');
        }
    }
}





