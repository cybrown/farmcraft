var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var FarmerSchema = new mongoose.Schema({
    pseudo : String,
    x: Number,
    y: Number
});

FarmerSchema.post('save', function (farmer) {
    emitter.emit('farmer.change', farmer);
});

FarmerSchema.post('remove', function (farmer) {
   emitter.emit('farmer.remove', farmer);
});

var Farmer = mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer;
