define(function () {

    var console2 = {};
    var emptyFunction = function () {};

    for (var i in console) {
        console2[i] = emptyFunction;
    }

    return console2;
});
