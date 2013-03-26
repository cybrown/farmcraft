
// TODO Traduire la doc en anglais.
/*
    Module simple pour l'injection de dependance.
    set: definit un nouveau service
    share: comme set, mais le service est instancie qu'une seule fois
    protect: si une fonction est donne, considere comme etant une valeur et pas un constructeur de service
    get: execute la fonction de creation du service et recupere le service associe

*/
(function () {
    'use strict';

    var Service = function (value, directToCache) {
        this.share = false;
        this.value = null;
        this.cache = null;

        this[(directToCache === true) || (typeof value !== 'function') ? 'cache' : 'value'] = value;
    };

    Service.prototype.get = function () {
        if (this.share === true) {
            return this.value();
        }
        return this.cache === null ? this.cache = this.value() : this.cache;
    };


    var Services = function () {
        this.services = {};
    };

    Services.prototype.set = function (name, value) {
        this.services[name] = new Service(value);
    };

    Services.prototype.protect = function (name, value) {
        this.services[name] = new Service(value, true);
    };

    Services.prototype.share = function (name, value) {
        this.services[name] = new Service(value);
        this.services[name].share = true;
    };

    Services.prototype.get = function (name) {
        return this.services.hasOwnProperty(name) ? this.services[name].get() : null;
    };

    module.exports = Services;
}());
