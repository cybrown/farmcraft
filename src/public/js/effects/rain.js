define(function () {
    var Rain = function () {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.drops = [];
    };

    Rain.prototype.init = function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    };

    Rain.prototype.draw = function (context) {
        context.strokeStyle = 'black';
        context.beginPath();
        for (i = this.drops.length - 1; i >= 0; i -= 1) {
            context.moveTo(this.drops[i].x + 0.5, this.drops[i].y);
            context.lineTo(this.drops[i].x + 0.5, this.drops[i].y - 30);
            context.stroke();
        }
        context.closePath();
        return this;
    };

    Rain.prototype.update = function (time) {
        var del = 0, i = 0;
        for (i = this.drops.length - 1; i >= 0; i -= 1) {
            this.drops[i].y += 10 * time/20;
            if (this.drops[i].y < this.height) {
                del = i;
            }
        }
        this.drops.push({x: Math.floor(Math.random() * this.width + this.x), y: 0});
        if (del) {
            this.drops.splice(0, del);
        }
        return this;
    };

    return Rain;
});
