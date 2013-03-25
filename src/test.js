var mongoose = require('mongoose');
var emitter = require('./globalEmitter');
var Farmer = require('./models/farmer');
var Building = require('./models/building');
var Culture = require('./models/culture');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

Farmer.create({}, function (err, f) {
    console.log(f.collection);
});
