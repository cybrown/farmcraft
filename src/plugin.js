/*global module */
// Fichier de base pour un plugin
(function () {
    'use strict';

    var Plugin = function (name) {
        this.name = 'anonymous_plugin';
        this.events = {};
        this.models = {};
        this.controllers = {};
        this.hasFiles = false;
        this.hasScript = false;
        this.hasControllers = false;
        this.hasViews = false;
        this.deps = [];
        this.services = null;
    };

    module.exports = Plugin;
}());
