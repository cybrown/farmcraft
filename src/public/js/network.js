/*global define, console, io*/
define(['networkemitter'], function (nemitter) {
    'use strict';

    var Network = function () {
        this.socket = null;
    };

    Network.prototype.init = function (channel) {
        this.socket = io.connect('/' + channel);

        this.socket.on('model', function (event) {
            nemitter.emit('model', event);
        });

        this.socket.on('command', function (event) {
            nemitter.emit('command', event);
        });

        return this;
    };

    Network.prototype.update = function (name, _id, hash) {
        this.socket.emit('update', {
            'name': name,
            '_id': _id,
            'hash': hash
        });
    };

    Network.prototype.emit = function (type, data) {
        this.socket.emit(type, data);
    };

    Network.prototype.join = function () {
        this.socket.emit('app.join');
    };

    return Network;
});
