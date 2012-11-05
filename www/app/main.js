
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    jQuery.support.cors = true;

    console.log( "READY" );

    //window.GeoWatcher.watch();

    loadTemplates(appTemplatesLoaded);
}

function appTemplatesLoaded() {
    console.log( "VIEW TEMPLATES LOADED" );

    $("body").empty();


    var homeView = new HomeView();

    console.log('Go to HOME View');
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator('body');
    window.viewNavigator.pushView(homeView);
    document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey(event) {
    if (window.viewNavigator.history.length > 1) {
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/*
var app = {
    initialize: function () {
        jQuery.support.cors = true;
        app.log('Initialize');
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    logCounter: 0,
    log: function (msg) {
        msg = (++app.logCounter) + ' ' + msg;
        //$('#logs').prepend('<li>' + msg + '</li>');
        console.log(msg);
    },
    onDeviceReady: function () {
        app.log("READY");
        app.loadTemplates(app.appTemplatesLoaded);
    },
    appTemplatesLoaded: function () {
        app.log("VIEW TEMPLATES LOADED");
        $("body").empty();
        var homeView = new HomeView();

        //Setup the ViewNavigator
        window.viewNavigator = new ViewNavigator('body');
        window.viewNavigator.pushView(homeView);
        document.addEventListener("backbutton", app.onBackKey, false);
    },
    onBackKey: function (event) {
        if (window.viewNavigator.history.length > 1) {
            event.preventDefault();
            window.viewNavigator.popView();
            return false;
        }
        navigator.app.exitApp();
        return false;
    }
};
app.log('Test');
*/