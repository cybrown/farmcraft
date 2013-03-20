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


    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        socket.session = {};
        console.log('connection');

        // Create farmer for the incoming player
        setTimeout(function () {
            socket.session.farmer = farmers.create();
        }, 1000);

        // Send all farmers
        var allFarmers = farmers.findAll();
        for (var f in allFarmers) {
            socket.emit('message', {
                'type': 'farmer.add', 
                'data': allFarmers[f]
            });
        }

        emitter.on('farmer.create', function (farmer) {
            socket.emit('message', {
                'type': 'farmer.add', 
                'data': farmer
            });
        });

        socket.on('notifychange', function (data) {
            socket.broadcast.emit('message', {
                'type': 'farmer.change',
                'data': data
            });
        });

        socket.on('disconnect', function () {
            if (socket.session.hasOwnProperty('farmer')) {
                farmers.remove(socket.session.farmer);
            }
            console.log('OK');
        });
    });


    emitter.on('farmer.remove', function (farmer) {
        io.sockets.emit('message', {
            'type': 'farmer.remove', 
            'data': farmer
        });
    });
}());
