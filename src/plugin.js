// Fichier de base pour un plugin
(function () {
    'use strict';

    var Plugin = function (name) {
        this.name = 'anonymous_plugin';
        this.events = {};
        this.models = {};
        this.hasFiles = false;
        this.deps = [];
    };

    module.exports = Plugin;
}());
