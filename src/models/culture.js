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

// todo
var eventPrefix = 'culture';
var getEventName = function (name) {
    return eventPrefix + '.' + name;
};

CultureSchema.post('save', function (culture) {
    emitter.emit(getEventName('change'), culture);
});

CultureSchema.post('remove', function (culture) {
    emitter.emit(getEventName('remove'), culture);
});

var Culture = mongoose.model('Culture', CultureSchema);

module.exports = Culture;