var assert = require('assert');

var Services = require('./index');

var s = new Services();

s.set('rand-1', function () {
    return Math.random();
});
s.share('rand-2', function () {
    return Math.random();
});
s.protect('rand-3', function () {
    return Math.random();
});

assert.equal(s.get('rand-1'), s.get('rand-1'), 'Simple service passed !');
assert.notEqual(s.get('rand-2'), s.get('rand-2'), 'Shared service passed !');
assert.equal(typeof s.get('rand-3'), 'function'), 'Protected service passed !';
console.log('All tests passed !');
