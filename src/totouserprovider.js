/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 26/03/13
 * Time: 22:18
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 26/03/13
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    var TotoUserProvider = function () {};

    TotoUserProvider.prototype.authenticate = function (login, pass) {
        if (login == "toto" && pass =="toto") {
            return true;
        } else {
            return false;
        }
    };

    TotoUserProvider.prototype.registration = function (pseudo, login, pass) {
        if (pseudo != null && login != null && pass != null) {
            if (pseudo != "" && login != "" && pass != "") {
                console.log("Utilisateur " + login + " registrated ");
                return true;
            }
        } else {
            return false;
        }
    };

    // Todo : tester et penser a mongoose (unique) + remplacer les return false

    module.exports = TotoUserProvider;

}());