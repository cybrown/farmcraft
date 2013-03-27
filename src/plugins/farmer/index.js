/*global module, console, setTimeout, require */
// Plug in pour le farmer
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        plugin = new Plugin();

    plugin.hasFiles = true;

    plugin.hasScript = true;

    plugin.events = {
        'app.connection': function (event) {
            console.log('[FARMER] detection de la connection d\'un nouveau joueur !');
            // Create farmer for the incoming player
            setTimeout(function () {
                var Farmer = require('./models/farmer');
                Farmer.create({x: 0, y: 0}, function (err, farmer) {
                    event.session.farmer = farmer;
                    event.socket.emit('command', {
                        'type': 'player.current',
                        'data': farmer._id
                    });
                });
            }, 1000);
        },
        'app.disconnect': function (event) {
            console.log('[FARMER] Un joueur est maintenant deconnecte !');
            if (event.session.hasOwnProperty('farmer')) {

                console.log('Player disconnected: ' + event.socket.id);
                event.session.farmer.remove(function (err) {
                    // TODO Handle error
                });
            }
        }
    };

    plugin.models = {
        'Farmer': require('./models/farmer')
    };

    module.exports = plugin;
}());
