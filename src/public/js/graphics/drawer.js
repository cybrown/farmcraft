define(['graphics/layer', 'guiemitter', 'graphics/requestAnimationFrame'], function (Layer, emitter) {

    var ORDER = {
        'start': 0,
        'end': -1
    };

    var Drawer = function () {
        this.defaultContext = null;
        this.layers = [];
        this.doRender = true;
        this.namedLayers = {};
    };

    Drawer.prototype.ORDER = Drawer.ORDER = ORDER;

    Drawer.prototype.init = function (context) {
        this.defaultContext = context;
        return this;
    };

    Drawer.prototype.add = function (layer, p_order) {
        var order = p_order || -1;
        if (order === -1) {
            this.layers.push(layer);
        } else if (order === 0) {
            this.layers.unshift(layer);
        } else {
            this.layers.splice(order, 0, layer);
        }
        return this;
    };

    Drawer.prototype.remove = function (layer) {
        var index = this.layers.indexOf(layer);
        if (index !== -1) {
            this.layers.splice(index, 1);
        }
        for (var l in this.namedLayers) {
            if (this.namedLayers.hasOwnProperty(l)) {
                delete this.namedLayers[l];
                break;
            }
        }
        return this;
    };

    Drawer.prototype.removeDrawable = function(drawable) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].remove(drawable);
        }
        return this;
    }

    Drawer.prototype.render = function () {
        this.defaultContext.clearRect(0, 0, this.defaultContext.canvas.width, this.defaultContext.canvas.height);
        for (var d in this.layers) {
            this.layers[d].render(this.defaultContext);
        }
        return this;
    };

    Drawer.prototype.renderTick = function () {
        if (this.doRender) {
            this.render();
            requestAnimationFrame(this.renderTick.bind(this));
        }
        return this;
    }

    Drawer.prototype.start = function () {
        emitter.emit('drawer.start-begin', this);
        this.doRender = true;
        this.renderTick();
        emitter.emit('drawer.start-end', this);
        return this;
    };

    Drawer.prototype.stop = function () {
        emitter.emit('drawer.stop-begin', this);
        this.doRender = false;
        emitter.emit('drawer.stop-end', this);
        return this;
    };

    Drawer.prototype.createLayer = function(name, order) {
        var layer = new Layer();
        this.add(layer, order);
        if (name !== null) {
            this.namedLayers[name] = layer;
        }
        return layer;
    };

    Drawer.prototype.getLayer = function(name) {
        return this.namedLayers[name];
    };

    return Drawer;
});
