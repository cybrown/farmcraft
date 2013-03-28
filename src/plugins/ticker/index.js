/*global module, console, setTimeout, require, setInterval, clearInterval */
// Plug in pour le farmer
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        emitter = require('./../../globalEmitter'),
        plugin = new Plugin();

    plugin.handle = null;

    plugin.hasFiles = false;

    plugin.hasScript = false;

    plugin.events = {
        'game.start': function () {
            plugin.handle = setInterval(function () {
                emitter.emit('game.tick');
            }, 1000);
        },
        'game.stop': function () {
            clearInterval(plugin.handle);
        }
    };

    module.exports = plugin;
}());
