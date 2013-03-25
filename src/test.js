var mongoose = require('mongoose');
var emitter = require('./globalEmitter');
var Farmer = require('./models/farmer');
var Building = require('./models/building');
var Culture = require('./models/culture');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

var q = Farmer.find();

q.exec(function (err, data) {
    console.log(err);
    console.log(data);
});
