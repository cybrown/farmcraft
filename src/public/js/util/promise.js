/*global console: true, define: true */
define(function () {
    'use strict';
    
    var STATUS = {
        'unknown': 1,
        'done'   : 2,
        'fail'   : 3
    };

    var execAll = function (callbacks, data) {
        for (var i in callbacks) {
            setTimeout(function () {
                callbacks[i](data);
            }, 0);
        }
    };

    var Promise = function () {
        this.status = STATUS.unknown;
        this.cDone = [];
        this.cFail = [];
        this.data = null;
    };

    Promise.prototype.STATUS = Promise.STATUS = STATUS;

    Promise.prototype.then = function (callbackDone, callbackFail, callbackAlways) {
        this.done(callbackDone);
        this.fail(callbackFail);
        this.always(callbackAlways);
    };

    Promise.prototype.done = function (callback) {
        var that = this;
        if (this.status === STATUS.unknown) {
            this.status = STATUS.done;
        } else if (this.status === STATUS.done) {
            setTimeout(function () {
                callback(that.data);
            }, 0);
        }
    };

    Promise.prototype.fail = function (callback) {
        var that = this;
        if (this.status === STATUS.unknown) {
            this.status = STATUS.fail;
        } else if (this.status === STATUS.fail) {
            setTimeout(function () {
                callback(that.data);
            }, 0);
        }
    };

    Promise.prototype.always = function (callback) {
        this.done(callback);
        this.fail(callback);
    };

    Promise.prototype.resolve = function (data) {
        if (this.status === STATUS.unknown) {
            this.data = data;
            this.status = STATUS.done;
            execAll(this.cDone, this.data);
        }
    };

    Promise.prototype.reject = function (data) {
        if (this.status === STATUS.unknown) {
            this.data = data;
            this.status = STATUS.fail;
            execAll(this.cFail, this.data);
        }
    };

    return Promise;
});
