/*global console, require, module*/
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        emitter = require('./../../globalEmitter'),
        plugin = new Plugin();

    plugin.hasFiles = false;

    plugin.hasScript = false;

    plugin.events = {
        'app.start': function (event) {
            console.log('[GAME] Start');
            emitter.emit('game.start', event);
        },
        'app.stop': function (event) {
            console.log('[GAME] Stop');
            emitter.emit('game.stop', event);
        },
        'app.connection': function (event) {
            console.log('[GAME] Client connected');
            emitter.emit('game.join', event);
        },
        'app.disconnect': function (event) {
            console.log('[GAME] Client disconnected');
            emitter.emit('game.leave', event);
        }
    };

    module.exports = plugin;
}());
