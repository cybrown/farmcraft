/*jslint node: true */
(function () {
    "use strict";
    var
        User = require('../models/user'),
        MongooseUserProvider;

    MongooseUserProvider = function () {

    };

    MongooseUserProvider.prototype.authenticate = function (login, password, cb) {
        User.findOne({'login': login, 'password': password}, function (err, user) {
            if (err) {
                cb(err);
            }
            cb(null, user);
        });
    };

    MongooseUserProvider.prototype.register = function (login, password, cb) {
        User.create({'login': login, 'password': password}, cb);
    };

    module.exports = MongooseUserProvider;
}());
