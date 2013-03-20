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

    var Chunk = function () {
        this.data = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [3, 3, 1, 1, 3, 1, 1, 3, 3, 1, 1, 3, 1, 1, 1, 3],
            [3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 1, 3, 3],
            [3, 3, 1, 3, 3, 3, 1, 3, 3, 1, 1, 3, 1, 3, 1, 3],
            [3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [3, 3, 1, 3, 3, 1, 1, 1, 3, 1, 1, 3, 3, 2, 2, 2],
            [3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 2, 1],
            [3, 1, 1, 3, 3, 1, 1, 3, 3, 3, 1, 3, 3, 1, 2, 1],
            [3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.x = 0;
        this.y = 0;
        this.tileWidth = 32;
        this.tileHeight = 32;
        return this;
    };

    Chunk.prototype.init = function() {
        
        return this;
    };

    Chunk.prototype.draw = function(context) {
        for (var i = 0; i < this.data.length; i += 1) {
            for (var j = 0; j < this.data[i].length; j += 1) {
                context.drawImage(dic[this.data[i][j]], j * this.tileWidth, i * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }
        return this;
    };

    return Chunk;
});
