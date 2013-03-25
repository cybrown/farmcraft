var mongoose = require('mongoose');
var emitter = require('./../globalEmitter');

var members = {
    pseudo : String,
    x: Number,
    y: Number,
    level: Number,
    experience: Number
};

var FarmerSchema = new mongoose.Schema(members);

FarmerSchema.post('save', function (farmer) {
    emitter.emit('farmer.change', farmer);
});

FarmerSchema.post('remove', function (farmer) {
    console.log('remove');
   emitter.emit('farmer.remove', farmer);
});

FarmerSchema.methods.fromHash = function (hash) {
    // TODO Optimiser cette fonction
    // TODO Utiliser un tableau de membres statics
    for (key in members) {
        if (members.hasOwnProperty(key) && hash.hasOwnProperty(key)) {
            this[key] = hash[key];
        }
    }
};

var Farmer = mongoose.model('Farmer', FarmerSchema);

module.exports = Farmer;
