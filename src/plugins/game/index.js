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
        'app.stop': function () {
            console.log('[GAME] Stop');
            emitter.emit('game.stop', event);
        }
    };

    module.exports = plugin;
}());
