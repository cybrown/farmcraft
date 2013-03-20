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
    };

    Collection.prototype.add = function (entity) {
        if (this.entities.indexOf(entity) === -1) {
            this.entities.push(entity);
            if (entity.collection !== null) {
                entity.collection.remove(entity);
            }
            entity.collection = this;
            this.emitter.emit(this.name + '.add', entity);
        }
    };

    Collection.prototype.remove = function (entity) {
        var index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.emitter.emit(this.name + '.remove', entity);
            this.entities[index] = this.entities[this.entities.length - 1];
            this.entities.pop();
        }
    };

    return Collection;
});
