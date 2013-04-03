/*jslint node: true*/
(function () {
    'use strict';

    var Plugin = require('./../../plugin'),
        plugin = new Plugin();

    plugin.hasFiles = true;

    plugin.hasScript = false;

    plugin.hasControllers = true;

    plugin.hasViews = true;

    var Totoup = require('./../../totouserprovider');
    var t = new Totoup();

    plugin.controllers = [
        {
            'route': '/login',
            'get': function (req, res) {
                res.render('login.jade');
            },
            'post': function (req, res) {
                res.send(t.authenticate(req.body.login, req.body.password));
            }
        },
        {
            'route': '/register',
            'get': function (req, res) {
                res.render('register.jade');
            },
            'post': function (req, res) {
                res.send('POST regiter');
            }
        }
    ];

    module.exports = plugin;
}());
