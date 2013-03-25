// Global Object for Debug

var GOD = {};
GOD.ev = {};

require(['application', 'networkemitter', 'network'], function (Application, nemitter, Network) {
    'use strict';
    var app = new Application();
    var net = (new Network()).init('');
    app.init(document.getElementById('canvas'), net);
    app.start();

    GOD.app = app;
});
