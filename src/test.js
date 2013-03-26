(function () {
    'use strict';
    var events = require('events');

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/farmcraftdb', function (err) {
        if (err) { throw err; }
    });

    var loadPluginEvents = function (plugin, emitter) {
        for (var ev in plugin.events) {
            if (typeof plugin.events[ev] === 'function') {
                emitter.on(ev, plugin.events[ev]);
            } else {
                for (var f in plugin.events[ev]) {
                    emitter.on(ev, plugin.events[ev][f]);
                }
            }
        }
    };

    var loadPlugin = function (plugin, emitter) {
        loadPluginEvents(plugin, emitter);
    };

    var demo = require('./plugins/demo');

    var emitter = new events.EventEmitter();

    loadPlugin(demo, emitter);

    emitter.emit('app.connection');
    emitter.emit('app.disconnect');

    var m = demo.models.Animal.create({name: 'chien', cri: 'wuooaf'}, function (err, chien) {
        console.log('Le chien: ' + chien.cri);
    });

}());
