/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 26/03/13
 * Time: 15:24
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var mongoose = require('mongoose');

    var emitter = require('./../../../globalEmitter');
    var name = 'User';

    var members = {
        pseudo : String,
        login: String,
        password: String
    };

    var schema = new mongoose.Schema(members);

    schema.methods.fromHash = function (hash) {
        for (key in members) {
            if (users.hasOwnProperty(key) && hash.hasOwnProperty(key)) {
                this[key] = hash[key];
            }
        }
    };

    module.exports = mongoose.model(name, schema);
}());
