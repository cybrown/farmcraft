/*jslint node: true*/
(function () {
    'use strict';

    var
        Plugin = require('./../../plugin'),
        plugin = new Plugin();

    plugin.hasFiles = true;
    plugin.hasScript = false;
    plugin.hasControllers = true;
    plugin.hasViews = true;

    plugin.controllers = [
        {
            'route': '/login',
            'get': function (req, res) {
                res.render('login.jade');
            },
            'post': function (req, res) {
                plugin.s.get('userprovider').authenticate(req.body.login, req.body.password, function (err, user) {
                    if (err) {  // TODO Page 500 sur les exceptions ?
                        throw err;
                    }
                    req.session.user = user;
                    res.send(user);
                });
            }
        },
        {
            'route': '/logout',
            'get': function (req, res) {
                req.session = null;
                res.send('LOGOUT');
            }
        },
        {
            'route': '/register',
            'get': function (req, res) {
                res.render('register.jade');
            },
            'post': function (req, res) {
                plugin.s.get('userprovider').register(req.body.login, req.body.password, function (err, user) {
                    if (err) {
                        throw err;
                    }
                    if (user === null) {
                        res.send(false);
                    } else {
                        res.send(true);
                    }
                });
            }
        }
    ];

    module.exports = plugin;
}());
