define(function () {
    var DIRECTION = {
        'up': 3,
        'down': 0,
        'left': 1,
        'right': 2
    };

    var Farmer = function () {
        this.x = 0;
        this.y = 0;
        this.faceDirection = DIRECTION.down;
        this.moveDirection = DIRECTION.down;
        this.speed = 0;
        this.frame = 0;
        this.img = null;
        this.lastanim = 0;
    };

    Farmer.DIRECTION = DIRECTION;

    Farmer.prototype.init = function (img, x, y, r) {
        this.img = img;
        this.x = x || 0;
        this.y = y || 0;
        this.faceDirection = r || DIRECTION.down;
    };

    Farmer.prototype.draw = function (context) {
        context.drawImage(this.img, this.frame * 32, this.faceDirection * 32, 32, 32, 0, 0, 32, 32);
    };

    Farmer.prototype.update = function (delta) {
        if (this.speed !== 0) {
            this.last += delta;
            if (this.last >= 200) {
                this.frame += 1;
                if (this.frame === 3) {
                    this.frame = 0;
                }
                this.last = 0;
            }
        }
        return this;
    };

    return Farmer;
});