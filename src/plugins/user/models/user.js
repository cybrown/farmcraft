/*jslint node: true*/
(function () {
    'use strict';
    var
        mongoose = require('mongoose'),
        name = 'User',
        members = {
            login: String,
            password: String,
            pseudo : String
        },
        schema = new mongoose.Schema(members);

    schema.methods.fromHash = function (hash) {
        var key;
        for (key in members) {
            if (members.hasOwnProperty(key) && hash.hasOwnProperty(key)) {
                this[key] = hash[key];
            }
        }
    };

    module.exports = mongoose.model(name, schema);
}());
