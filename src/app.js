/**
 * Fichier principale de l'application.
 */
/*jslint nomen:true node:true*/
(function () {
    "use strict";
    var express = require('express'),
        http = require('http'),
        app = express(),
        fs = require('fs');


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

    var server = http.createServer(app);

    server.listen(app.get('port'), function () {
        console.log("Server listening on port " + app.get('port'));
    });


    var io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        console.log('connection');
        setTimeout(function () {
            socket.emit('message', {'type': 'player.add', 'data': {}});
        }, 1000);
    });
}());
