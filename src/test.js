var mongoose = require('mongoose');
var emitter = require('./globalEmitter');
var Farmer = require('./models/farmer');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

Farmer.create({}, function (err, f) {
    console.log(f.collection);
});
