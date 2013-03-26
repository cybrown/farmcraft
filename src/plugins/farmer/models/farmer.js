(function () {
    var mongoose = require('mongoose');

    var emitter = require('./../../../globalEmitter');
    var name = 'Farmer';

    var members = {
        pseudo : String,
x: Number,
    y: Number,
    level: Number,
    experience: Number
};

// On creer le schema
var schema = new mongoose.Schema(members);

// On definit les evenements pour le shema
schema.post('save', function (object) {
    console.log('save');
    emitter.emit('farmer.change', object);
});

schema.post('remove', function (object) {
    emitter.emit('farmer.remove', object);
});

schema.methods.fromHash = function (hash) {
    for (key in members) {
        if (members.hasOwnProperty(key) && hash.hasOwnProperty(key)) {
            this[key] = hash[key];
        }
    }
};

module.exports = mongoose.model(name, schema);
}());
