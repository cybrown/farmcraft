
 define(function () {
     'use strict';
        var Culture;

     Culture = function () {
         this.x = 0;                // position de la tuile de semis
         this.y = 0;
         this.type = "Tomate";
         this.img = null;
         this.frame = 0;
         this.growrate =  5000; // je ne sais pas qu'elle est la  l'unité de mesure du temps (seconde??)
         this.decaytime = 5000; // Pareil
         this.productivity = 500;       // valeur mise aléatoirement
         this.storability = 5000; // Unité de temps??
         this.seedprice = 10; //voir la gestion des couts pour chaque élément...
         this.healthlevel = 100; // exprimé en pourcentage
         this.maturityindicator = 0; // exprimé en %
     };

     Culture.prototype.draw = function (context) {
         context.drawImage(this.img , 0 , 0, 32, 32);
     };
     Culture.prototype.init = function (img, x, y) {
         this.img = img;
         this.x = x || 0;
         this.y = y || 0;

         return this;

     };

     return Culture;
 });