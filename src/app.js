/**
 * Fichier principale de l'application.
 */
/*jslint nomen:true node:true*/
(function () {
    "use strict";
    var express = require('express'),
        http = require('http'),
        app = express(),
        fs = require('fs'),
        events = require('events'),
        server = http.createServer(app);
        var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/farmcraftdb', function (err) {
        if (err) { throw err; }
    });

    app.set('port', process.env.PORT || 3000);
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

    server.listen(app.get('port'), function () {
        console.log("Server listening on port " + app.get('port'));
    });

    // Entities
    var Farmer = require('./models/farmer');
    var Building = require('./models/building');

    // Entity emitter
    var emitter = require('./globalEmitter');

    // Create comminucation channel for this game
    var channel = require('socket.io').listen(server);

    // Listner for changes in the models and send them to the clients
    emitter.on('farmer.create', function (farmer) { // New farmer
        channel.sockets.emit('message', {
            'type': 'farmer.add',
            'model': 'farmer',
            'data': farmer,
            'tag': 'create'
        });
    });

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
        channel.sockets.emit('message', {
            'type': 'farmer.change',
            'model': 'farmer',
            'data': farmer
        });
    });

    emitter.on('farmer.remove', function (farmer) {
        channel.sockets.emit('message', {
            'type': 'farmer.remove', 
            'data': farmer
        });
    });

    Farmer.remove();

    // Listen and setup events for a new connection
    channel.on('connection', function (socket) {
        socket.session = {};
        console.log('New player: ' + socket.id);

        // Create farmer for the incoming player
        setTimeout(function () {
            Farmer.create({x: 0, y: 0}, function (err, farmer) {
                socket.session.farmer = farmer;
                socket.emit('command', {
                    'type': 'player.current',
                    'data': farmer._id
                });
            });
        }, 1000);

        // Send all farmers to the newly connected player
        Farmer.find({}, function (err, allFarmers) {
            allFarmers.forEach(function (farmer) {
                //socket.emit('model', {
                socket.emit('message', {
                    'type': 'farmer.change',
                    'model': 'farmer',
                    'data': farmer,
                    'tag': 'findAll'
                });
            });
        });

        // Receive commands from client
        socket.on('notifychange', function (data) {
            Farmer.findOne({'_id': data._id}, function (err, farmer) {
                if (err) throw err;
                farmer.x = data.x;
                farmer.y = data.y;
                farmer.save();
            });
        });

        // The player has disconnected, remove listeners and remove his player from the game
        socket.on('disconnect', function () {
            if (socket.session.hasOwnProperty('farmer')) {

                console.log('Player disconnected: ' + socket.id);
                Farmer.remove({'_id': socket.session.farmer._id}, function (err) {
                    // TODO Handle error
                });
            }
            console.log('Player disconnected: ' + socket.id);
        });
    });

}());
