/*global define, console*/
define(['globalviewcontainer', 'views/animal'], function (views, Animal) {
    "use strict";
    views.add('Animal', Animal);
    console.log('Le plugin demo est charge sur le client \\o/');
});
