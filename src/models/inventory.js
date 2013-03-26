var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');
var ItemSchema =  require('./item');

var InventorySchema = new mongoose.Schema({
    items: [ ItemSchema ],
    slots: Number,
    capacity: Number
});

var eventPrefix = 'inventory';
var getEventName = function (name) {
    return eventPrefix + '.' + name;
};

InventorySchema.post('save', function (inventory) {
    emitter.emit(getEventName('change'), inventory);
});

InventorySchema.post('remove', function (inventory) {
    emitter.emit(getEventName('remove'), inventory);
});

var Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;