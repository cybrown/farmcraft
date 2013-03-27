/*global require, module */
(function () {
    'use strict';
    var mongoose = require('mongoose'),
        emitter = require('./../../../globalEmitter'),
        name = 'Farmer',

        members = {
            pseudo : String,
            x: Number,
            y: Number,
            level: Number,
            experience: Number
        },

    // On creer le schema
        schema = new mongoose.Schema(members);

    // On definit les evenements pour le shema
    schema.post('save', function (object) {
        emitter.emit('model.change', object);
    });

    schema.post('remove', function (object) {
        emitter.emit('model.remove', object);
    });

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
