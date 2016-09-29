
'use strict';
var test = require('tape');
var SDK = require('../index');

test('SDK', function (t) {
    t.plan(2);
    var sdk = SDK.init('uk');
    t.notEqual(sdk.config, null, 'Once initialized with a valid market, config is NOT null');
    var sdk = SDK.init('invalid market');
    t.equal(sdk.config, null, 'Once initialized with a non valid market, config IS null');
});
