define(function () {
    // TODO Put all this code in a module
    var createImage = function (path) {
        var img = new Image();
        img.src = path;
        return img;
    };

    var tiles = {
        'eau': createImage('img/eau.jpg'),
        'herbe': createImage('img/GrassTileFinal.png'),
        'roche': createImage('img/SmStoneFinal.png'),
        'sable': createImage('img/SandFinal.png'),
        'snow': createImage('img/SnowTileFinal.png'),
        'dirt': createImage('img/DirtTileFinal.png')
    };

    var dic = [tiles.eau, tiles.herbe, tiles.roche, tiles.sable, tiles.snow, tiles.dirt];
    // TODO end todo

    var defaultTiles = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var Chunk = function () {
        this.tiles = defaultTiles;
        this.mapx = 0;
        this.mapy = 0;
        this.tileWidth = 32;
        this.tileHeight = 32;
        Object.defineProperty(this, 'x', {
            get: function () {return this.mapx * 512; },
            set: function (value) {}
        });
        Object.defineProperty(this, 'y', {
            get: function () {return this.mapy * 512; },
            set: function (value) {}
        });
        return this;
    };

    Chunk.prototype.modelName = 'Chunk';

    Chunk.defaultLayer = Chunk.prototype.defaultLayer = 'tilemap';

    Chunk.prototype.init = function () {

        return this;
    };

    Chunk.prototype.fromHash = function (hash) {
        ['_id', 'mapx', 'mapy', 'tiles'].forEach(function (key) {
            if (hash.hasOwnProperty(key)) {
                this[key] = hash[key];
            }
        }.bind(this));
        return this;
    };

    Chunk.prototype.draw = function (context) {
        var i, j;
        for (i = 0; i < this.tiles.length; i += 1) {
            for (j = 0; j < this.tiles[i].length; j += 1) {
                context.drawImage(dic[this.tiles[i][j]], j * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }
        return this;
    };

    return Chunk;
});
