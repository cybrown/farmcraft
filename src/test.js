var mongoose = require('mongoose');
var emitter = require('./globalEmitter');
var Building = require('./models/building');
var Culture = require('./models/culture');
var Inventory = require('./models/inventory');

mongoose.connect('mongodb://localhost/farmcraftdb', function(err) {
    if (err) { throw err; }
});

/*
 var q = Farmer.find();

 q.exec(function (err, data) {
 console.log(err);
 console.log("joueur: " + data);
 });
 */

/*
Building.create({
    x: 100,
    y: 100
}, function (err, data) { console.log("building: " + data) });

*/

/*
var Items = [{ type: "arme", name: "ak47" }, { type: "armure", name: "gilet" }]

function addItem (type, name) {
    Items.push({type: type, name: name});
}

addItem("arme", "m16");
addItem("arme", "m4");
*/

var Item  = mongoose.model('Item');
var m16 = new Item({ type:'arme', name:'m16' });
var m4 = new Item({ type:'arme', name:'m4' });

Inventory.create({
    items: [ m16, m4],
    slots: 10,
    capacity: 10
}, function (err, data) { console.log("Inventory: " + data) });