(function () {




    var Entity = function () {

    };

    Entity.prototype.init = function () {

    };

    Entity.create = function () {
        return {
            'type': 'player',
            'x': 0,
            'y': 0
        };
    };


    exports = Entity;

}());
