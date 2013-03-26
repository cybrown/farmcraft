/**
 * Created with IntelliJ IDEA.
 * User: alexandre
 * Date: 21/03/13
 * Time: 22:49
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

// Creation du schema farmer
    var schFarmer = new mongoose.Schema({
        pseudo : String,
        x: Number,
    y: Number
});

// Creation du model farmer
var modFarmer = mongoose.model('Farmer', schFarmer);

var f = new modFarmer({pseudo: "Alex", x: 100, y: 100});

module.exports = f;

f.save(function (err) {
    if (err) { throw err; }
    //console.log("Hello " + f.pseudo + ",id : " + f.id + ", position x : " + f.x + ", position y : " + f.y);
    // On se déconnecte de MongoDB maintenant
    mongoose.connection.close();
});