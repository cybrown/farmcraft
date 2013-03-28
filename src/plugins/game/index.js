/*global console, require, module*/
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        emitter = require('./../../globalEmitter'),
        plugin = new Plugin();

    plugin.hasFiles = false;

    plugin.hasScript = false;

    plugin.events = {
        'app.start': function () {
            console.log('[GAME] Start');
            emitter.emit('game.start');
        },
        'app.stop': function () {
            console.log('[GAME] Stop');
            emitter.emit('game.stop');
        }
    };

    module.exports = plugin;
}());
