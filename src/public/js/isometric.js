/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 14/01/13
 * Time: 16:19
 * To change this template use File | Settings | File Templates.
 */

/*===========================================
 =            Isometric GameBoard            =
 ===========================================*/

"use strict";

var IsometricBoard = function () {
    this.eau = new Image();
    this.eau.src = 'img/eau.jpg';
    this.herbe = new Image();
    this.herbe.src = 'img/GrassTileFinal.png';
    this.roche = new Image();
    this.roche.src = 'img/SmStoneFinal.png';
    this.sable = new Image();
    this.sable.src = 'img/SandFinal.png';
    this.snow = new Image();
    this.snow.src = 'img/SnowTileFinal.png';
    this.dirt = new Image();
    this.dirt.src = 'img/DirtTileFinal.png';
    this.dic = [this.eau, this.herbe, this.roche, this.sable, this.snow, this.dirt];
    this.board = [[3, 3, 3, 3, 3, 3],[3, 3, 3, 3, 3, 3],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0],[1, 2, 2, 3, 1, 1],[3, 4, 4, 5, 5, 5],[5, 5, 5, 1, 1, 1]];
    this.map = { x: 400, y: 100};
    this.dx = 140;
    this.dy = 0;
};

IsometricBoard.prototype.init = function (width, height) {
    this.width = width;
    this.height = height;
};

IsometricBoard.prototype.beginIso = function(ctx) {
    ctx.translate(this.map.x, this.map.y);
    ctx.scale(1, 0.5);
    ctx.rotate(45 * Math.PI / 180);
};

IsometricBoard.prototype.endIso = function(ctx) {
    ctx.restore();
};

IsometricBoard.prototype.draw = function(ctx) {
    for (var i = this.board.length - 1; i >= 0; i--) {
        for (var j = this.board[i].length - 1; j >= 0; j--) {
            ctx.drawImage(this.dic[this.board[i][j]], i * 64, j * 64, 64, 64);
        }
    }
};
