define(function () {

    var Layer = function () {
        this.context = null;
        this.drawables = [];
        this.doRender = true;
    };

    Layer.prototype.init = function (context) {
        this.context = context;
        return this;
    };

    Layer.prototype.add = function (drawable) {
        this.drawables.push(drawable);
        return this;
    };

    Layer.prototype.remove = function (drawable) {
        var index = this.drawables.indexOf(drawable);
        if (index !== -1) {
            this.drawables[index] = this.drawables[this.drawables.length - 1];
            this.drawables.pop();
        }
        return this;
    };

    Layer.prototype.render = function (defaultContext) {
        var context = this.context || defaultContext;
        for (var d in this.drawables) {
            context.save();
            context.translate(this.drawables[d].x, this.drawables[d].y);
            this.drawables[d].draw(context);
            context.restore();
        }
        return this;
    };

    return Layer;
});
