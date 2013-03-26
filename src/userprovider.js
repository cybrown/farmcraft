/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 26/03/13
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */
(function () {
    'use strict';

    var UserProvider = function () {

    };

    UserProvider.prototype.authenticate = function (login, pass) {
        if (login == "toto" && pass =="toto") {
           return true;
        } else {
            return false;
        }
    };

    module.exports = UserProvider;

}());