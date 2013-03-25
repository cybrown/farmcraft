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

var Building = mongoose.model('Building', BuildingSchema);