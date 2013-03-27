/**
 * Fichier principale de l'application.
 */
/*jslint nomen:true node:true*/
(function () {
    "use strict";
    var express = require('express'),
        app = express(),
        server = require('http').createServer(app);

    var loadPluginEvents = function (plugin, emitter) {
        for (var ev in plugin.events) {
            if (typeof plugin.events[ev] === 'function') {
                emitter.on(ev, plugin.events[ev]);
            } else {
                for (var f in plugin.events[ev]) {
                    emitter.on(ev, plugin.events[ev][f]);
                }
            }
        }
    };

    var loadPluginModels = function (plugin, modelContainer) {
        for (var model in plugin.models) {
            modelContainer[model] = plugin.models[model];
        }
    };

    var clientPlugins = [];

    var loadPlugin = function (pluginName, emitter, modelContainer) {
        var plugin = require(__dirname + '/plugins/' + pluginName);
        loadPluginEvents(plugin, emitter);
        loadPluginModels(plugin, modelContainer);
        if (plugin.hasFiles) {
            app.use(express.static(__dirname + '/plugins/' + pluginName + '/public'));
        }
        if (plugin.hasScript) {
            clientPlugins.push(pluginName);
        }
    };

    // TODO Cy - Cette fonction doit etre ranger quelque part
    var sendObject = function (socket, object, remove) {
        socket.emit('model', {
            'model': object.constructor.modelName,
            'object': remove ? null : object,
            '_id': object._id
        });
    };

    var Culture = function () {
        this.x = 0;
        this.y = 0;
    };

    // TODO Cy - Supprimer ici
    var Collection = require('./collection');

    // Entity emitter
    var emitter = require('./globalEmitter');
    // TODO Mettre cet objet quelque part ou ca peut etre propre...
    var modelList = {};

    // TODO Cy - Supprimer cette collection
    var cultures = (new Collection()).init('culture', Culture, emitter);

    // TODO Cy - Cette fonction doit etre ranger quelque part
    var getModelByName = function (name) {
        return modelList[name] || null;
    };





    var startExpress = function (next) {
        var fs = require('fs');

        app.set('port', process.env.PORT || 3000);

        // HTTP Configuration
        app.set('view engine', 'jade');

        app.use(express.static(__dirname + '/public'));

        app.get('/', function (req, res) {
            res.render('index.jade');
        });

        app.get('/tests', function (req, res) {
            fs.readdir(__dirname + '/public', function (err, dirdata) {
                var tests = [],
                    i = 0;
                if (err) {
                    res.render('error.jade', {'message': err});
                } else {
                    for (i = 0; i < dirdata.length; i += 1) {
                        if (dirdata[i].substr(0, 5) === 'test_') {
                            tests.push(dirdata[i]);
                        }
                    }
                    res.render('tests.jade', {'tests': tests});
                }
            });
        });
    };

    var startMongoose = function (next) {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/farmcraftdb', function (err) {
            if (err) { throw err; }
            next();
        });
    };

    var startPlugins = function (next) {
        var fs = require('fs');
        // TODO Cy - Declencher l'event plugin loaded ou un truc du genre
        // TODO Utiliser la methode asynchrone et utiliser next()
        var plugins = fs.readdirSync(__dirname + '/plugins');
        plugins.forEach(function (pluginName) {
            if (pluginName[0] !== '.') {
                loadPlugin(pluginName, emitter, modelList);
            }
        });
        next();
    };

    var startChannel = function (next) {
        // Create comminucation channel for this game
        var channel = require('socket.io').listen(server);

        // TODO Cy - il faut refactoriser ces bouts de code pour generalier a tous les models...
        emitter.on('model.change', function (model) {
            sendObject(channel.sockets, model);
        });
        emitter.on('model.remove', function (model) {
            sendObject(channel.sockets, model, true); // TODO do remove
        });

        // Listen and setup events for a new connection
        channel.on('connection', function (socket) {
            socket.session = {};    // TODO Cy - Initialiser la session correctement...

            socket.emit('command', {
                'type': 'plugin.load',
                'data': clientPlugins
            });

            socket.on('app.join', function () {
                console.log('New player: ' + socket.id);
                emitter.emit('app.connection', {
                    'session': socket.session,
                    'socket': socket
                });

                // Send all models to the newly connected player
                // TODO Cy - Dans l'ideal, il ne faut pas envoyer tous les models, seulement ceux qui sont necessaires (geographiquement proches, etc...)
                for (var key in modelList) {
                    modelList[key].find({}, function (err, objects) {
                        if (objects[0]) {
                            console.log('Sending models: ' + objects[0].constructor.modelName);
                            objects.forEach(function (object) {
                                sendObject(socket, object);
                            });
                        }
                    });
                }
            });

            socket.on('update', function (event) {
                var model = getModelByName(event.name);
                if (model !== null) {
                    model.findById(event._id, function (err, object) {
                        object.fromHash(event.hash);
                        object.save();
                    });
                }
            });

            // The player has disconnected, remove listeners and remove his player from the game
            socket.on('disconnect', function () {
                emitter.emit('app.disconnect', {
                    'session': socket.session,
                    'socket': socket
                });
                console.log('Player disconnected: ' + socket.id);
            });
        });
        next();
    };

    var startListener = function (next) {
        server.listen(app.get('port'), function () {
            console.log("Server listening on port " + app.get('port'));
            next();
        });
    };

    var Task = function (run, deps) {
        this.run = run;
        this.deps = deps || [];
        this.started = false;
    };

    var tasks = {
        'listener': new Task(startListener, ['express', 'channel', 'plugins']),
        'express': new Task(startExpress),
        'mongoose': new Task(startMongoose),
        'plugins': new Task(startPlugins, ['mongoose']),
        'channel': new Task(startChannel, ['plugins'])
    };

    var startTask = function (taskName) {
        var task = tasks[taskName];
        if (task.started) {
            return;
        }
        console.log('Starting Task: ' + taskName);
        task.started = true;
        for (var t in task.deps) {
            startTask(task.deps[t]);
        }
        task.run(function () {});
    };

    for (var t in tasks) {
        startTask(t);
    }

}());
