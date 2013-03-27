/*global console: true, define: true */
// Une vue pour un Model de type animal
// Il y a toutes les methodes que doivent implementer les vues
// Ici, on se content de dessiner un carre jaune... x)
define([], function () {
    "use strict";

    var Animal = function () {

    };

    Animal.prototype.init = function () {

        return this;    // Toujours retourner this a la place de ne rien retourner, pour pouvoir chainer les appels
    };

    Animal.prototype.draw = function (ctx) {
        // On ne prend pas en compte la position de l'objet pour le dessiner
        // On le dessine juste comme si il etait a 0, 0
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, 32, 32);
        return this;
    };

    Animal.prototype.update = function () {
        // Ici il faut mettre le code pour gerer les animations (deplacement, tir d'arme etc...)

        return this;
    };

    return Animal;
});
