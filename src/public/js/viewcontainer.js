define(function () {
    'use strict';

    var ViewContainer = function () {
        this.views = {};
    };

    ViewContainer.prototype.add = function (name, view) {
        if (this.views.hasOwnProperty(name)) {
            throw 'Model ' + name + ' is already registered.';
        }
        this.views[name] = view;
        return this;
    };

    ViewContainer.prototype.remove = function (name) {
        if (this.views.hasOwnProperty(name)) {
            delete this.views[name];
        }
        return this;
    };

    ViewContainer.prototype.get = function (name) {
        return this.views.hasOwnProperty(name) ? this.views[name] : null;
    };

    return ViewContainer;
});
