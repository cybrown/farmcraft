/*global require, module, console*/
(function () {
    "use strict";
    var async = require('async'),
        TaskManager = function () {
            this.tasks = {};
            this.nameOrder = [];
            this.runOrder = [];
        },
        Task = function (name, deps, run) {
            this.name = name;
            this.deps = deps || [];
            this._run = run;
            this.run = function (callback) {
                console.log('Task ' + this.name + ' starting...');
                var callback2 = function () {
                    console.log('Task ' + this.name + ' started !');
                    callback();
                }.bind(this);
                this._run(callback2);
            }.bind(this);
            this.started = false;
        };

    TaskManager.prototype.add = function (task) {
        this.tasks[task.name] = task;
    };

    TaskManager.prototype.look = function (task) {
        var t;
        if (this.nameOrder.indexOf(task.name) === -1) {
            for (t in task.deps) {
                if (task.deps.hasOwnProperty(t)) {
                    if (this.tasks.hasOwnProperty(task.deps[t])) {
                        this.look(this.tasks[task.deps[t]]);
                    } else {
                        throw 'Task [' + task.name + '] has an unexisting dependency [' + task.deps[t] + ']';
                    }
                }
            }
            this.nameOrder.push(task.name);
        }
    };

    TaskManager.prototype.computeRunOrder = function () {
        var t, n;
        for (t in this.tasks) {
            if (this.tasks.hasOwnProperty(t)) {
                this.look(this.tasks[t]);
            }
        }
        for (n = 0; n < this.nameOrder.length; n += 1) {
            this.runOrder.push(this.tasks[this.nameOrder[n]].run);
        }
    };

    TaskManager.prototype.start = function () {
        this.computeRunOrder();
        async.series(this.runOrder);
    };

    module.exports = {
        'TaskManager': TaskManager,
        'Task': Task
    };
}());
