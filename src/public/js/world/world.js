/*global define, console */
define(['world/tilemap', 'world/chunk', 'guiemitter', 'collection'], function (Tilemap, Chunk, emitter, Collection) {
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
        var tilemap = (new Tilemap()).init(),
            chunk = (new Chunk()).init();
        tilemap.addChunk(chunk, 0, 0);
        emitter.emit('tilemap.set', tilemap);
        return this;
    };

    return World;
});
