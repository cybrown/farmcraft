/*global module */
// Un fichier d'exemple pour un model
// les lignes avec /**/ sont sensees etre modifiees, les autres aussi mais moins souvent...

// Tres important, la fonction qui s'execute elle meme avec le 'use strict'
(function () {
    'use strict';
    // Pour un model on a forcemment besoin de mongoose... x)
    var mongoose = require('mongoose'),

    // On importe aussi l'emitter global
        emitter = require('./../../../globalEmitter'),

    // Tres important, le nom du model !!
        name = 'Animal',    /**/

    // On definit le schema du model
        members = {
            'nom': String,  /**/
            'cri': String,  /**/
            'x':   Number,  /**/
            'y':   Number   /**/
        },

    // On creer le schema
        schema = new mongoose.Schema(members);

    // On definit les evenements pour le shema
    schema.post('save', function (object) {
        emitter.emit('animal.change', object);  /**/ // TODO Cy - Il faut changer le nom des evenements pour ne plus y avoir le nom du model
    });

    schema.post('remove', function (object) {
        emitter.emit('animal.remove', object);  /**/ // TODO Cy - Pareil, il faut pas retrouver le nom du model ici
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
