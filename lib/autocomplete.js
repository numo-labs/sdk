
'use strict';

var config;

function autocomplete (context, cfg) {
    config = cfg;
    return _autocomplete[context];
}

var _autocomplete = {
    departure_airport: {
        for: function (input, callback) {
            var results = Object.keys(config.departureAirports)
                            .filter(function (item, idx) {
                                return item.indexOf(input) >= 0;
                            });
            return callback(results);
        }
    },
    destination: {
        for: function(input, departure_airport, callback) {
            return callback();
        }
    }
};

/**
 * Public interface
 * 
 */
module.exports = autocomplete;