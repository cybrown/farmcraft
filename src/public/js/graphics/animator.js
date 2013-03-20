define(['guiemitter'], function (emitter) {
    var Animator = function () {
        this.last = 0;
        this.elements = [];
        this.interval = null;
        this.delta = 20;
        this.isRunning = false;
    };

    Animator.prototype.init = function(defaultDelta) {
        this.delta = defaultDelta;
        return this;
    };

    Animator.prototype.add = function (elem) {
        if (typeof elem.update === "function") {
            this.elements.push(elem);
        }
        return this;
    };

    Animator.prototype.remove = function (elem) {
        var index = this.elements.indexOf(elem);
        if (index !== -1) {
            this.elements[index] = this.elements[this.elements.length - 1];
            this.elements.pop();
        }
        return this;
    };

    Animator.prototype.update = function() {
        var now = +new Date();
        if (this.last === 0) {
            this.last = now - 20;
        }
        for (var elem in this.elements) {
            this.elements[elem].update(now - this.last);
        }
        this.last = now;
        return this;
    };

    Animator.prototype.setDelta = function(delta) {
        this.delta = delta;
        this.reloadConfig();
        return this;
    };

    Animator.prototype.start = function() {
        emitter.emit('animator.start-begin', this);
        this.interval = setInterval(function () {
            this.update();
        }.bind(this), this.delta);
        this.isRunning = true;
        emitter.emit('animator.start-end', this);
        return this;
    };

    Animator.prototype.stop = function() {
        if (this.isRunning === true) {
            emitter.emit('animator.stop-begin', this);
            clearInterval(this.interval);
            this.isRunning = false;
            emitter.emit('animator.stop-end', this);
        }
        return this;
    };

    Animator.prototype.reloadConfig = function() {
        if (this.isRunning) {
            this.stop().start();
        }
    }

    return Animator;
});
