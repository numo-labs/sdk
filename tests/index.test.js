
'use strict';

var expect = require('chai').expect;
var SDK = require('../index');

describe('SDK', function () {
    it('Once initialized with a valid market, config is NOT null', function (done) {
        var sdk = SDK.init('uk');
        expect(sdk.config).to.be.not.null;
        done();
    });
    it('Once initialized with a non valid market, config IS null', function (done) {
        var sdk = SDK.init('invalid market');
        expect(sdk.config).to.be.null;
        done();
    });
});
