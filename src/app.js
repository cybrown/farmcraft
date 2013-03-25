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

    app.use(express['static'](__dirname + '/public'));

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

    // WEBSOCKET Configuration
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/farmcraftdb', function (err) {
        if (err) { throw err; }
    });

    // Entity emitter
    var emitter = require('./globalEmitter');

    // Create comminucation channel for this game
    var channel = require('socket.io').listen(server);

    // TODO Create module
    var sendObject = function (socket, object, remove) {
        socket.emit('model', {
            'model': object.collection.name,
            'object': remove ? null : object,
            '_id': object._id
        });
    };

    // TODO Mettre cet objet dans le fichier de configuration
    var modelList = {
        'farmers' : require('./models/farmer')
    };

    var getModelByName = function (name) {
        return modelList[name] || null;
    };

    /*
    emitter.on('building.create', function (building) {
       channel.socket.emit('message', {
          'type': 'building.add',
           'model': 'building',
           'data': building,
           'tag': 'create'
       });
    });
    */

    emitter.on('farmer.change', function (farmer) {
        sendObject(channel.sockets, farmer);
    });

    emitter.on('farmer.remove', function (farmer) {
        sendObject(channel.sockets, farmer, true); // TODO do remove
    });

    // TODO Remove all entities when server boots ?

    // Listen and setup events for a new connection
    channel.on('connection', function (socket) {
        socket.session = {};
        console.log('New player: ' + socket.id);

        // Create farmer for the incoming player
        setTimeout(function () {
            var Farmer = require('./models/farmer');
            Farmer.create({x: 0, y: 0}, function (err, farmer) {
                socket.session.farmer = farmer;
                socket.emit('command', {
                    'type': 'player.current',
                    'data': farmer._id
                });
            });
        }, 1000);

        // Send all farmers to the newly connected player
        for (var key in modelList) {
            modelList[key].find({}, function (err, objects) {
                objects.forEach(function (object) {
                    sendObject(socket, object);
                });
            });
        }

        socket.on('update', function (event) {
            // Mettre a jour l'objet
            var model = getModelByName(event.name);
            if (model !== null) {
                model.findById(event._id, function (err, object) {
                    object.fromHash(event.hash);
                    console.log(object);
                    object.save();
                });
            }
        });

        // The player has disconnected, remove listeners and remove his player from the game
        socket.on('disconnect', function () {
            if (socket.session.hasOwnProperty('farmer')) {

                console.log('Player disconnected: ' + socket.id);
                socket.session.farmer.remove(function (err) {
                    console.log('remove');
                    // TODO Handle error
                });
            }
            console.log('Player disconnected: ' + socket.id);
        });
    });

    server.listen(app.get('port'), function () {
        console.log("Server listening on port " + app.get('port'));
    });

}());
