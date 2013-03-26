var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');


var ItemSchema = new mongoose.Schema({
    type: String,
    name: String
});

var eventPrefix = 'inventory';
var getEventName = function (name) {
    return eventPrefix + '.' + name;
};

ItemSchema.post('save', function (inventory) {
    emitter.emit(getEventName('change'), inventory);
});

ItemSchema.post('remove', function (inventory) {
    emitter.emit(getEventName('remove'), inventory);
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = ItemSchema;