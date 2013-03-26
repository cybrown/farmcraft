var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var BuildingSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    type: String,
    cost: Number,
    capacity: Number,
    power: Number
});


var eventPrefix = 'building';
var getEventName = function (name) {
    return eventPrefix + '.' + name;
};

BuildingSchema.post('save', function (building) {
    emitter.emit(getEventName('change'), building);
});

BuildingSchema.post('remove', function (building) {
    emitter.emit(getEventName('remove'), building);
});

var Building = mongoose.model('Building', BuildingSchema);

module.exports = Building;