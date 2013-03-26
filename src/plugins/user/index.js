// Plugin pour le user
(function () {
    'use strict';

    var Plugin = require('./../../plugin');

    var plugin = new Plugin();

    plugin.hasFiles = true;

    plugin.events = {

    };

    plugin.models = {
        'User': require('./models/user')
    };

    module.exports = plugin;
}());
