/*global module, require */
(function () {
    'use strict';
    var mongoose = require('mongoose'),
        emitter = require('./../../../globalEmitter'),
        name = 'Chunk',
        members = {
            'mapx':   Number,
            'mapy':   Number,
            'tiles': [{}]
        },
        schema = new mongoose.Schema(members);

    // On definit les evenements pour le schema, pour declencher les events et la synchro des qu'on save ou remove
    schema.post('save', function (object) {
        emitter.emit('model.change', object);
    });

    schema.post('remove', function (object) {
        emitter.emit('model.remove', object);
    });

    // C'est la methode qui permet de mettre le contenu d'un tableau a la con dans un model
    // Il est possible de la modifier si le model a un comportement a la con avec
    // certain de ses attributs
    schema.methods.fromHash = function (hash) {
        var key;
        for (key in members) {
            if (members.hasOwnProperty(key) && hash.hasOwnProperty(key)) {
                this[key] = hash[key];
            }
        }
    };

    /**/ // On peut definir les methodes et les statiques ici

        // On creer le model et on l'exporte, c'est le seul truc qui va etre exporte en fait
    module.exports = mongoose.model(name, schema);
}());
