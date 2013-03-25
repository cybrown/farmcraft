var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var CultureSchema = mongoose.Schema({
    x: Number,
    y: Number,
    type: String,
    growRate: Number,
    decayTime: Number,
    productivity: Number,
    storability: Number,
    seedPrice: Number,
    health: Number,
    maturity: Number
});

var Culture = mongoose.model('Culture', CultureSchema);

module.exports = Culture;