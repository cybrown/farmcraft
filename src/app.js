/**
 * Fichier principale de l'application.
 */
/*jslint nomen:true node:true*/
(function () {
    "use strict";
    var express = require('express'),
        app = express(),
        server = require('http').createServer(app);


    app.set('port', process.env.PORT || 3000);

    // HTTP Configuration
    var fs = require('fs');
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

    var loadPlugin = function (pluginName, emitter, modelContainer) {
        var plugin = require('./plugins/' + pluginName);
        loadPluginEvents(plugin, emitter);
        loadPluginModels(plugin, modelContainer);
        if (plugin.hasFiles) {
            app.use(express.static(__dirname + '/plugins/' + pluginName + '/public'));
        }
    };



    // WEBSOCKET Configuration
    var mongoose = require('mongoose');

    // TODO Cy - Declencher l'event db.started
    mongoose.connect('mongodb://localhost/farmcraftdb', function (err) {
        if (err) { throw err; }
    });

    // Entity emitter
    var emitter = require('./globalEmitter');

    // TODO Mettre cet objet quelque part ou ca peut etre propre...
    var modelList = {};

    // Load plugins
    // TODO Cy - Declencher l'event plugin loaded ou un truc du genre
    //loadPlugin('demo', emitter, modelList);
    loadPlugin('farmer', emitter, modelList);

    // Create comminucation channel for this game
    var channel = require('socket.io').listen(server);

    // TODO Cy - Cette fonction doit etre ranger quelque part
    var sendObject = function (socket, object, remove) {
        socket.emit('model', {
            'model': object.constructor.modelName,
            'object': remove ? null : object,
            '_id': object._id
        });
    };

    // TODO Cy - Cette fonction doit etre ranger quelque part
    var getModelByName = function (name) {
        return modelList[name] || null;
    };

    // TODO Cy - il faut refactoriser ces bouts de code pour generalier a tous les models...
    emitter.on('farmer.change', function (farmer) {
        sendObject(channel.sockets, farmer);
    });
    emitter.on('farmer.remove', function (farmer) {
        sendObject(channel.sockets, farmer, true); // TODO do remove
    });

    // Listen and setup events for a new connection
    channel.on('connection', function (socket) {
        socket.session = {};
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

    server.listen(app.get('port'), function () {
        console.log("Server listening on port " + app.get('port'));
    });

}());
