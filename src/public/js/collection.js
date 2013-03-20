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
        this.entities[entity.id] = entity;
        entity.collection = this;
        this.emitter.emit(this.name + '.add', entity);
        return this;
    };

    Collection.prototype.find = function (id) {
        return this.entities[id];
    };

    Collection.prototype.remove = function (id) {
        var index = this.entities.indexOf(entity);
        if (this.entities.hasOwnProperty(id)) {
            this.emitter.emit(this.name + '.remove', this.entities[entity]);
            delete this.entities[entity.id];
        }
    };

    return Collection;
});
