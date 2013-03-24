var mongoose = require('mongoose');
var emitter = require('./globalEmitter');

emitter.on('farmer.create', function (farmer) {
    console.log('farmer: ' + farmer._id + ' has been created.');
});

emitter.on('farmer.change', function (farmer) {
    console.log('farmer: ' + farmer._id + ' has been changed.');
});

emitter.on('farmer.remove', function(farmer) {
    console.log('farmer: ' + farmer._id + ' has been removed.');
});

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

var Farmer = require('./models/farmer');

var farmer = Farmer.create({pseudo: "Alex", x: 100, y: 100});

// appel l'event farmer.remove
farmer.remove();

// appel l'event farmer.change
farmer.save();

//mongoose.connection.close();
