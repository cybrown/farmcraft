/*global require, console, module */
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
    var Plugin = require('./../../plugin'),
        plugin = new Plugin();

    // On indique que le plugin propose un repertoire pour des fichiers statiques
    plugin.hasFiles = true;

    // On indique que le plugin a un script a execute par le client
    plugin.hasScript = true;

    // On indique que le plugin a des controllers supplementaires
    plugin.hasControllers = true;

    // En plus d'avoir des routes, le plugin a des vues jade qui sont dans le dossier views
    plugin.hasViews = true;

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

    // On ajoute les nouveaux controlleurs
    plugin.controllers = {
        '/demo': function (req, res) {
            // On utilise un template fourni par ce plugin, dans le dossier views
            res.render('demo');
        }
    };

    // Pour les controlleurs, on definit un tableau de routes, avec les actions pour chaques methodes.
    // les methodes sont get, post, put, delete et all.
    // la route est dans la cle 'route'
    plugin.controllers = [
        {
            'route': '/demo',
            'get': function (req, res) {
                // On utilise un template fourni par ce plugin, dans le dossier views
                res.render('demo');
            },
            'post': function (req, res) {
                // On utilise un template fourni par ce plugin, dans le dossier views
                res.render('demopost');
            }
        }
    ];

    // On exporte notre plug in
    module.exports = plugin;
}());
