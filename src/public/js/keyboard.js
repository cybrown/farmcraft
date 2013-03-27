/*global document, define */
define(['guiemitter'], function (emitter) {
    'use strict';

    var Keyboard = function () {
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
    };

    var downHandler = function (e) {
        switch (e.which) {
        case 37:
            if (this.left === false) {
                this.left = true;
                emitter.emit('keyboard.left.down', this);
            }
            break;
        case 38:
            if (this.up === false) {
                this.up = true;
                emitter.emit('keyboard.up.down', this);
            }
            break;
        case 39:
            if (this.right === false) {
                this.right = true;
                emitter.emit('keyboard.right.down', this);
            }
            break;
        case 40:
            if (this.down === false) {
                this.down = true;
                emitter.emit('keyboard.down.down', this);
            }
            break;
        default:
            return;
        }
        e.preventDefault();
        return false;
    };

    var upHandler = function (e) {
        switch (e.which) {
        case 37:
            if (this.left === true) {
                this.left = false;
                emitter.emit('keyboard.left.up', this);
            }
            break;
        case 38:
            if (this.up === true) {
                this.up = false;
                emitter.emit('keyboard.up.up', this);
            }
            break;
        case 39:
            if (this.right === true) {
                this.right = false;
                emitter.emit('keyboard.right.up', this);
            }
            break;
        case 40:
            if (this.down === true) {
                this.down = false;
                emitter.emit('keyboard.down.up', this);
            }
            break;
        default:
            return;
        }
        e.preventDefault();
        return false;
    };

    Keyboard.prototype.enable = function () {
        document.addEventListener('keydown', downHandler.bind(this));
        document.addEventListener('keyup', upHandler.bind(this));
    };

    Keyboard.prototype.disable = function () {
        document.removeEventListener('keydown', downHandler);
        document.removeEventListener('keyup', upHandler);
    };

    return Keyboard;
});
