/*jslint node: true*/
(function () {
    'use strict';

    var
        Plugin = require('./../../plugin'),
        plugin = new Plugin(),
        MongooseUserProvider = require('./services/mongooseuserprovider');

    plugin.hasFiles = true;

    plugin.models = {
        'User': require('./models/user')
    };

    plugin.hasServices = true;
    plugin.services = [
        {
            'name': 'userprovider',
            'type': 'share',
            'service': function () {
                return new MongooseUserProvider();
            }
        }
    ];

    module.exports = plugin;
}());

