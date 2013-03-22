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
    var Farmer = function () {
        this.x = 0;
        this.y = 0;
    };

    var Event = function () {
        this.x = 0;
        this.y = 0;
    };

    var Collection = require('./collection');

    // Entity emitter
    var emitter = new events.EventEmitter();

    // Collections
    var farmers = (new Collection()).init('farmer', Farmer, emitter);
    var events = (new Collection()).init('farmer', Event, emitter);

    // Create comminucation channel for this game
    var channel = require('socket.io').listen(server);

    // Listner for changes in the models and send them to the clients
    emitter.on('farmer.create', function (farmer) { // New farmer
        channel.sockets.emit('message', {
            'type': 'farmer.add', 
            'data': farmer
        });
    });

    emitter.on('farmer.remove', function (farmer) {
        channel.sockets.emit('message', {
            'type': 'farmer.remove', 
            'data': farmer
        });
    });

    var modFarmer = require('./_testMongoose');
    //console.log(modFarmer.modFarmer.pseudo);
    //console.log(modFarmer.modFarmer.id);
    //console.log(modFarmer.modFarmer.x);
    //console.log(modFarmer.modFarmer.y);

    // Listen and setup events for a new connection
    channel.on('connection', function (socket) {
        socket.session = {};
        console.log('connection');

        // Create farmer for the incoming player
        setTimeout(function () {
            socket.session.farmer = farmers.create();
        }, 1000);

        // Send all farmers to the newly connected player
        var allFarmers = farmers.findAll();
        for (var f in allFarmers) {
            socket.emit('message', {
                'type': 'farmer.add', 
                'data': allFarmers[f]
            });
        }



        socket.on('notifychange', function (data) {
            console.log(data);
            var f = farmers.find(data.id);
            f.x = data.x;
            f.y = data.y;
            farmers.change(f);
            /*
            socket.broadcast.emit('message', {
                'type': 'farmer.change',
                'data': data
            });
*/
        });

        // The player has disconnected, remove listeners and remove his player from the game
        socket.on('disconnect', function () {
            if (socket.session.hasOwnProperty('farmer')) {
                farmers.remove(socket.session.farmer);
            }
            console.log('OK');
        });
    });



}());
