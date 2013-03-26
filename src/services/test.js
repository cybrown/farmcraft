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
s.protect('rand-4', 42);

assert.notEqual(s.get('rand-1'), s.get('rand-1'), 'Services defined with set must return different values.');
assert.equal(s.get('rand-2'), s.get('rand-2'), 'Services defined with share must return the same value.');
assert.equal(typeof s.get('rand-3'), 'function'), 'Protected services must return a function.';
assert.equal(s.get('rand-4'), 42), 'Testing for a simple value.';
console.log('All tests passed !');
