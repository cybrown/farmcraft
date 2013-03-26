/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 26/03/13
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';
    var mongoose = require('mongoose')
        , user = require('./plugins/user/models/user')
        , emitter = require('./globalEmitter');

    var MongooseUserProvider = function () {};

    MongooseUserProvider.prototype.authenticate = function (login, pass, callback) {
        var query = user.findOne();
        query.where('login', login).where('password', pass).exec( function (err, data) {
            console.log(data);
            callback(data !== null);
        });
    };

    MongooseUserProvider.prototype.registration = function (pseudo, login, pass) {
        if (pseudo != null && login != null && pass != null) {
            if (pseudo != "" && login != "" && pass != "") {

                // On recupère le model User
                var User = mongoose.model('User');

                // Création de l'utilisateur
                var newUser = new User({ 'pseudo': pseudo, 'login': login, 'password': pass});
                console.log(newUser);

                // On sauvegarde l'utilisateur
                newUser.save();

                // Ev lors de la création de l'utilisateur
                emitter.emit('user.register', newUser);

                return true;
            }
        } else {
            return false;
        }
    };

    // Todo : tester et penser a mongoose (unique) + remplacer les return false

    module.exports = MongooseUserProvider;

}());