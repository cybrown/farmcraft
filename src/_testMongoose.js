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

// Creation du schema
var schema = new mongoose.Schema({
    name : String
});

// Creation du model associé à ce schema
var Test = mongoose.model('Test', schema);

var t = new Test();
t.name = "Alex";

t.save(function (err) {
    if (err) { throw err; }
    console.log("Hello " + t.name);
    // On se déconnecte de MongoDB maintenant
    mongoose.connection.close();
});