define(function () {
    'use strict';

    var Tilemap = function () {
        this.x = 0;
        this.y = 0;
        this.chunks = [];
    };

    Tilemap.prototype.init = function () {

        return this;
    };

    Tilemap.prototype.draw = function (context) {
        for (var c in this.chunks) {
            this.chunks[c].chunk.draw(context);
        }
        return this;
    };

    Tilemap.prototype.addChunk = function (chunk, x, y) {
        this.chunks.push({
            x: x,
            y: y,
            chunk: chunk
        });
        return this;
    };

    return Tilemap;
});
