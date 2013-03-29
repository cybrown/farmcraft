(function () {
    "use strict";

    var Task = function (deps, run) {
        this.run = run;
        this.deps = deps || [];
        this.started = false;
    };

    Task.prototype.start = function (arg) {
        if (!this.started) {
            this.run(arg);
            this.started = true;
        }
        return;
    };

    var TaskManager = function () {
        this.tasks = {};
    };

    TaskManager.prototype.startTask = function (name) {
        var name, nameIndex, deps;
        deps = this.tasks[name].task.deps;
        for (nameIndex in deps) {
            name = deps[nameIndex];
            if (!this.tasks[name].started) {
                this.startTask(name);
            }
        }
        this.tasks[name].task.start();
    };

    TaskManager.prototype.start = function () {
        var name;
        for (name in this.tasks) {
            if (!this.tasks[name].started) {
                this.startTask(name);
            }
        }
    };

    TaskManager.prototype.add = function (name, task) {
        this.tasks[name] = {
            'task': task,
            'started': false
        };
    };

    var a = new Task([], function () {
        console.log('Task A starting...');
        setTimeout(function () {
            console.log('Task A started !');
        }, 1000);
    });

    var b = new Task(['a'], function () {
        console.log('Task B starting...');
        setTimeout(function () {
            console.log('Task B started !');
        }, 1000);
    });

    var c = new Task(['b'], function () {
        console.log('Task C starting...');
        setTimeout(function () {
            console.log('Task C started !');
        }, 1000);
    });

    var d = new Task(['b', 'c'], function () {
        console.log('Task D starting...');
        setTimeout(function () {
            console.log('Task D started !');
        }, 1000);
    });

    var tm = new TaskManager();
    tm.add('a', a);
    tm.add('b', b);
    tm.add('c', c);
    tm.add('d', d);


    tm.start();

}());
