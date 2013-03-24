// Global Object for Debug

var GOD = {};
GOD.ev = {};

require(['application', 'farmer', 'effects/rain', 'networkemitter', 'network'], function (Application, Farmer, Rain, nemitter, Network) {

    var app = new Application();
    var net = (new Network()).init('');
    app.init(document.getElementById('canvas'), net);
    app.start();


    GOD.createPlayer = function () {
            var img = new Image();
            img.src = 'img/frog.png';
            var farmer = new Farmer();
                farmer.init(img);
            farmer.x = 0;
            farmer.y = 0;
            return farmer;
    };

    GOD.app = app;

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

    

    GOD.ev.sendNotify = function () {
        net.notifychange({
            'id': app.player._id,
            'x': 64,
            //'x': app.player.x,
            'y': 64
            //'y': app.player.y
        });
    };

});
