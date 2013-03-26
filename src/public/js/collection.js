/*global define, console*/
define(function () {
    var Collection = function () {
        this.entities = [];
        this.name = '';
        this.emitter = null;
    };

    Collection.prototype.init = function (name, emitter) {
        this.name = name;
        this.emitter = emitter;
        return this;
    };

    Collection.prototype.add = function (entity) {
        this.entities[entity._id] = entity;
        entity.collection = this;
        this.emitter.emit(this.name + '.add', entity);
        return this;
    };

    Collection.prototype.find = function (id) {
        return this.entities[id] || null;
    };

    Collection.prototype.remove = function (id) {
        if (this.entities.hasOwnProperty(id)) {
            this.emitter.emit(this.name + '.remove', this.entities[id]);
            delete this.entities[id];
        }
    };

    Collection.prototype.notify = function (entity) {
        this.emitter.emit(this.name + '.change', entity);
    };

    return Collection;
});
