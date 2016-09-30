
'use strict';
var test = require('tape');
import autocomplete from '../../lib/autocomplete';
import {ukConfig} from '../../uk-config';

test('Autocomplete', function (t) {
    t.plan(2);
    t.test('Departure airport', function (st) {
        st.plan(4);
        var autoComplete = autocomplete('departure_airport', ukConfig);
        autoComplete.for('City', function (err, elements) {
            st.equal(err, null, 'Should not return an error');
            st.deepEqual(elements, ['London City'], 'Should filter departure airports based on the input ');
        });
        autoComplete.for('no matches input', function (err, elements) {
            st.equal(err, null, 'not return and error ');
            st.deepEqual(elements, [], 'Should return an empty array if there is no matches ');
        });
    });
    t.test('Destination', function (st) {
        st.plan(3);
        var autoComplete = autocomplete('destination', ukConfig);
        autoComplete.for('Islan', 'London City', function (err, elements) {
            st.equal(err, null, 'Should not return an error if departure airport is valid');
            st.deepEqual(elements, ['Balearic Islands'], 'Should filter destination airports based on the input and the departure airport ');
        });
        autoComplete.for('London', 'Unexistent departure airport', function (err) {
            st.notEqual(err, null, 'Should return an error if departure airport is not valid');
        });
    });
});
