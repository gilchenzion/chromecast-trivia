var session = null;

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
    if (loaded) {
        initializeCastApi();
    } else {
        console.log(errorInfo);
    }
}

$('#castme').click(function(){
        launchApp();
});


$('#stop').click(function(){
        stopApp();
});

var initializeCastApi = function() {
    var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
        sessionListener,
        receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
};

var sessionListener = function(e) {
    session = e;
    console.log('Chromecast Session Created');
    if (session.media.length != 0) {
        console.log('Found ' + session.media.length + ' sessions.');
    }
};

var receiverListener = function(e) {
    if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        console.log("Chromecast was found on the network.");
    } else {
        console.log("No Chromecasts found");
    }
};

var onInitSuccess = function() {
    console.log("Initialization successfull");
};

var onInitError = function() {
    console.log("Initialization error");
};

var launchApp = function() {
    console.log("Launching the Chromecast App...");
    chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
};

var onRequestSessionSuccess = function(e) {
    console.log("Successfully created session: " + e.sessionId);
    session = e;
    loadMedia();
}

var loadMedia = function() {
    if (!session) {
        console.log("No session.");
        return;
    }

    var mediaInfo = new chrome.cast.media.MediaInfo('http://i.imgur.com/IFD14.jpg');
    mediaInfo.contentType = 'image/jpg';

    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;

    session.loadMedia(request, function() {
        console.log("Success!");
    }, function() {
        console.log("Load Error");
    });
}

var onLaunchError = function() {
    console.log("Error connecting to the Chromecast.");
};

var stopApp = function() {
    session.stop(function() {
        console.log("Successfully stopped the application");
    }, function() {
        console.log("Error Stopping the application");
    });
}
