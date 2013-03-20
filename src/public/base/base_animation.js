/**
 * Fichier exemple pour une classe dessinee et animee dans le navigateur.
 * Il faut renommer Base avec le nom de la classe.
 */
(function () {
    "use strict";
    var Base = function () {

    };

    Base.prototype.init = function () {
        // Code pour initialiser l'animation
        // Cette methode est appelee une seule fois dans toute la session du joueur
    };

    Base.prototype.draw = function (ctx) {
        // Code pour dessinner l'objet
        // Appelee a chaque fois que le canvas est dessine
    };

    Base.prototype.update = function () {
        // Code pour mettre a jour l'animation
        // Appelee pour mettre a jour l'animation
    };

    Base.prototype.start = function () {
        // Appelee a chaque fois que l'animation commence
    };

    Base.prototype.stop = function () {
        // Appelee a chaque fois que l'animation s'arrete
    };

    window.Base = Base;

}());
