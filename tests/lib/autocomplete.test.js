
'use strict';

var expect = require('chai').expect;
var autocomplete = require('../../lib/autocomplete');
var ukConfig = require('../../uk-config.json');

describe('Autocomplete', function () {
    describe('Departure airport', function () {
        var autoComplete = autocomplete('departure_airport', ukConfig);
        it('Should filter departure airports based on the input ', function (done) {
            autoComplete.for('City', function (elements) {
                expect(elements).to.deep.equal(['London City'])
                done();
            });
        });
    });
    describe('Destination', function () {
        it('Should filter destination airports based on the input and the departure airport ', function (done) {
            var autoComplete = autocomplete('destination', ukConfig);
            autoComplete.for('Islan', 'London City', function (elements) {
                expect(elements).to.deep.equal(['Balearic Islands']);
                done();
            });
        });
    });
});
