var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var FarmerSchema = new mongoose.Schema({
    pseudo : String,
    x: Number,
    y: Number
});

var Farmer = mongoose.model('Farmer', FarmerSchema);

FarmerSchema.static.create = function (hash) {
    var result = new Farmer(hash);
    emitter.emit('farmer.create', result);
    return result;
};

FarmerSchema.post('save', function (farmer) {
    console.log('save');
    emitter.emit('farmer.change', farmer);
});

module.exports = Farmer;
