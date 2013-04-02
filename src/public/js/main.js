// Global Object for Debug

var GOD = {};
GOD.ev = {};

require(['application', 'effects/rain', 'networkemitter', 'network'], function (Application, Rain, nemitter, Network) {

    var app = new Application();
    var net = (new Network()).init('');
    app.init(document.getElementById('canvas'), net);
    app.start();

    GOD.app = app;

});
