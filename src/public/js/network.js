/*global define, console, io*/
define(['networkemitter', 'farmer'], function (nemitter, Farmer) {
    'use strict';

    var Network = function () {
        this.socket = null;
    };

    // type, x, y, img?
    var entityFactory = function (hash) {
        var res;
        switch (hash.type) {
        case 'farmer':
            res = new Farmer();
            var img = new Image();
            img.src = 'img/frog.png';
            res.init(img);
            break;
        }
        res.x = hash.x;
        res.y = hash.y;
        return res;
    };

    Network.prototype.init = function (channel) {
        this.socket = io.connect('/' + channel);
        this.socket.on('message', function (event) {
            console.log(event);
            nemitter.emit(event.type, entityFactory(event.data));
        });

        this.socket.on('notifychange', function (data) {
            console.log('CHANGE');
            console.log(data);
        });
    };

    Network.prototype.notifychange = function (data) {
        this.socket.emit('notifychange', data);
    };

    return Network;
});
