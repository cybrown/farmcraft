/*global console: true, define: true */
define(['util/console2'], function (console2) {
    'use strict';

    var EventEmitter = function () {
        this.events = {};
    };

    EventEmitter.prototype.on = function (type, callback) {
        if (!this.events.hasOwnProperty(type)) {
            this.events[type] = [];
            console.log('EventEmitter: [' + type + '] created.');
        }
        if (this.events[type].indexOf(callback) === -1) {
            this.events[type].push(callback);
            console.log('EventEmitter: [' + type + '] one callback registered.');
        }
    };

    EventEmitter.prototype.off = function (type, callback) {
        if (callback === null) {
            this.events[type] = [];
            console.log('EventEmitter: [' + type + '] cleared.');
        } else {
            var index = this.events[type].indexOf(callback);
            if (index !== -1) {
                this.events[type][index] = this.events[type][this.events[type].length - 1];
                this.events[type].pop();
                if (this.events[type].length === 0) {
                    delete this.events[type];
                    console.log('EventEmitter: [' + type + '] cleared by removing one callback.');
                } else {
                    console.log('EventEmitter: [' + type + '] removed one callback.');
                }
            }
        }
    };

    EventEmitter.prototype.emit = function (type, data) {
        var count = 0,
            i;
        console.log('EventEmitter: [' + type + '] starting.');
        if (this.events.hasOwnProperty(type)) {
            try {
                for (i = this.events[type].length - 1; i >= 0; i -= 1) {
                    this.events[type][i](data);
                    count += 1;
                }
                console.log('EventEmitter: [' + type + '] ' + count + ' callbacks executed synchronously.');
            } catch (ex) {
                console.log('EventEmitter: [' + type + '] failed.');
                console.log(ex);
                throw ex;
            }
            console.log('EventEmitter: [' + type + '] finished.');
        } else {
            console.log('EventEmitter: [' + type + '] no events registered.');
        }
    };

    return EventEmitter;
});
