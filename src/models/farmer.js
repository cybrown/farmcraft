var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var FarmerSchema = new mongoose.Schema({
    pseudo : String,
    x: Number,
    y: Number,
    level: Number,
    experience: Number
});

var eventPrefix = 'farmer';
var getEventName = function (name) {
    return eventPrefix + '.' + name;
};

FarmerSchema.post('save', function (farmer) {
    emitter.emit(getEventName('change'), farmer);
});

FarmerSchema.post('remove', function (farmer) {
   emitter.emit(getEventName('remove'), farmer);
});

var Farmer = mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer;
