/*global require, module */
(function () {
    'use strict';

    // On importe la classe qui represente un plugin
    var Plugin = require('./../../plugin');

    var plugin = new Plugin();

    // On indique que le plugin propose un repertoire pour des fichiers statiques
    plugin.hasFiles = true;

    // On indique que le plugin a un script a execute par le client
    plugin.hasScript = true;

    plugin.events = {};

    // On ajoute les models a notre plugin
    plugin.models = {
        'Chunk': require('./models/chunk')
    };

    // On exporte notre plug in
    module.exports = plugin;
}());
