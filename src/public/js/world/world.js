/*global define, console */
define(['world/tilemap', 'guiemitter', 'collection'], function (Tilemap, emitter, Collection) {
    'use strict';

    var World = function () {
        this.tilemap = null;
        this.entities = null;
        this.events = null;
    };

    World.prototype.init = function () {
        (this.entities = new Collection()).init('entity', emitter);
        (this.events = new Collection()).init('event', emitter);
        this.initTilemap();
        return this;
    };

    World.prototype.initTilemap = function () {
        this.tilemap = (new Tilemap()).init();
        //    chunk = (new Chunk()).init();
        //tilemap.addChunk(chunk, 0, 0);
        emitter.emit('tilemap.set', this.tilemap);
        return this;
    };

    World.prototype.addChunk = function (chunk) {
        this.tilemap.addChunk(chunk);
    };

    return World;
});
