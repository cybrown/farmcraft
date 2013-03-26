(function () {
    'use strict';

    var Collection = function () {
        this.name = null;
        this.type = null;
        this.entities = {};
        this.autoinc = 1;
        this.emitter = null;
    };

    Collection.prototype.init = function (name, type, emitter) {
        this.name = name;
        this.type = type;
        this.emitter = emitter;
        return this;
    };

    Collection.prototype.create = function (hash) {
        var res = new this.type();
        res.id = this.autoinc;
        res.type = this.name;
        this.entities[this.autoinc] = res;
        this.autoinc += 1;
        this.emitter.emit(this.name + '.create', res);
        console.log(res);
        return res;
    };

    Collection.prototype.findAll = function () {
        return this.entities;
    };

    Collection.prototype.find = function (id) {
        if (this.entities.hasOwnProperty(id)) {
            return this.entities[id];
        }
        return null;
    };

    Collection.prototype.remove = function (entity) {
        if (!entity) return;
        if (this.entities.hasOwnProperty(entity.id)) {
            this.emitter.emit(this.name + '.remove', entity);
            delete this.entities[entity.id];
        }
        return this;
    };

    Collection.prototype.change = function (entity) {
        this.emitter.emit(this.name + '.change', entity);
    };

    module.exports = Collection;

}());
