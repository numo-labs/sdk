
'use strict';

var expect = require('chai').expect;
var autocomplete = require('../../lib/autocomplete');
var ukConfig = require('../../uk-config.json');

describe('Autocomplete', function () {
    describe('Departure airport', function () {
        var autoComplete = autocomplete('departure_airport', ukConfig);
        it('Should filter departure airports based on the input ', function (done) {
            autoComplete.for('City', function (err, elements) {
                expect(err).to.be.null;
                expect(elements).to.deep.equal(['London City']);
                done();
            });
        });
        
        it('Should return an empty array if there is no matches ', function (done) {
            autoComplete.for('no matches input', function (err, elements) {
                expect(err).to.be.null;
                expect(elements).to.deep.equal([]);
                done();
            });
        });

    });
    describe('Destination', function () {
        var autoComplete = autocomplete('destination', ukConfig);
        it('Should filter destination airports based on the input and the departure airport ', function (done) {
            autoComplete.for('Islan', 'London City', function (err, elements) {
                expect(err).to.be.null;
                expect(elements).to.deep.equal(['Balearic Islands']);
                done();
            });
        });
        it('Should return an error if departure airport is not valid', function (done) {
            autoComplete.for('London', 'Unexistent departure airport', function (err) {
                expect(err).not.to.be.null;
                done();
            });
        });
    });
});
