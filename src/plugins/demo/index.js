// Fichier d'exemple pour un plug in

/*
Le but de se plug in est de fournir une classe qui pourrait etre utilise un peu partout
De plus, il reagit a certain evenements de l'application.
Il fourni aussi un model.
*/

// Tres important, utiliser la fonction qui s'execute de suite avec le 'use strict' pour etre sur de pas polluer
// l'espace de nom global
(function () {
    'use strict';

    // On importe la classe qui represente un plugin
    var Plugin = require('./../../plugin');

    var plugin = new Plugin();

    // On indique que le plugin propose un repertoire pour des fichiers statiques
    plugin.hasFiles = true;

    // On definit les actions qui auront lieu sur les evenements
    // C'est un objet dont les cles sont les noms des evenements.
    // Si il faut definir plusieurs evenements par nom, on peut mettre un tableau de fonctions
    plugin.events = {
        'app.connection': function (event) {
            console.log('[DEMO] detection de la connection d\'un nouveau joueur !');
        },
        'app.disconnect': function (event) {
            console.log('[DEMO] Un joueur est maintenant deconnecte !');
        }
    };

    // On ajoute les models a notre plugin
    plugin.models = {
        'Animal': require('./models/animal')
    };

    // On exporte notre plug in
    module.exports = plugin;
}());
