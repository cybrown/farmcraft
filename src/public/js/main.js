/*global console: true, require: true */
require(['application'], function (Application) {
    var app = new Application();
    app.init(document.getElementById('canvas'));
    app.start();
});

// Global Object for Debug

var GOD = {};
GOD.ev = {};

require(['farmer', 'effects/rain', 'networkemitter', 'network'], function (Farmer, Rain, nemitter, Network) {
    GOD.createPlayer = function () {
            var img = new Image();
            img.src = 'img/frog.png';
            var farmer = new Farmer();
                farmer.init(img);
            farmer.x = 0;
            farmer.y = 0;
            return farmer;
    };


    GOD.createEvent = function (eventType) {
        var resEvent;
        resEvent = new Rain();
        resEvent.init(300, 300);
        return resEvent;
    };

    var evEntity = GOD.createPlayer();
    GOD.ev.playerAdd = function () {
        nemitter.emit('player.add', evEntity);
    };
    GOD.ev.playerRemove = function () {
        nemitter.emit('player.remove', evEntity);
    };

    var evRain = GOD.createEvent()
    GOD.ev.eventAdd = function () {
        nemitter.emit('event.add', evRain);
    };
    GOD.ev.eventRemove = function () {
        nemitter.emit('event.remove', evRain);
    };

    var net = (new Network()).init('');
});
