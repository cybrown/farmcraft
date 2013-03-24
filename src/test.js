var mongoose = require('mongoose');
var emitter = require('./globalEmitter');

emitter.on('farmer.create', function (farmer) {
    console.log('farmer.create: ' + farmer._id);
});

emitter.on('farmer.change', function (farmer) {
    console.log('farmer.change: ' + farmer._id);
});

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

var Farmer = require('./models/farmer');

var farmer = Farmer.create({pseudo: "Alex", x: 100, y: 100});

farmer.save(function () {
    mongoose.connection.close();
});
