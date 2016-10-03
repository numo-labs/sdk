
'use strict';
var test = require('tape');
var SDK = require('../index');

test('SDK', function (t) {
    t.plan(4);
    var sdk1 = SDK.init('uk');
    t.notEqual(sdk1.config, null, 'Once initialized with a valid market, config is NOT null');
    
    var autocomplete = sdk1.autocomplete('departure_airport');
    autocomplete.for('City', function (err, elements) {
        t.equal(err, null, 'Autocomplete should not produce error');
        t.deepEqual(elements, ['London City'], 'Autocomplete should filter departure airports based on the input ');
    });
    
    var sdk2 = SDK.init('invalid market');
    t.equal(sdk2.config, null, 'Once initialized with a non valid market, config IS null');
    
});
