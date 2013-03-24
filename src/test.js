var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

var Farmer = require('./models/farmer');

var farmer = new Farmer({pseudo: "Alex", x: 100, y: 100});

farmer.save(function () {
    console.log('save OK');
    mongoose.connection.close();
});
