
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        plugin = new Plugin();

    plugin.hasFiles = true;

    plugin.hasScript = true;

    plugin.hasControllers = true;

    plugin.hasViews = true;

    plugin.events = {
        'app.connection': function (event) {
            console.log('[DEMO] detection de la connection d\'un nouveau joueur !');
        },
        'app.disconnect': function (event) {
            console.log('[DEMO] Un joueur est maintenant deconnecte !');
        }
    };

    plugin.models = {};

    plugin.controllers = {
        '/login': function (req, res) {
            res.render('login.jade');
        }
    };

    module.exports = plugin;
}());
