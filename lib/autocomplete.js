
'use strict';

var config;

/**
 * Market config data
 * @typedef {Object} Config
 * @property {Object} departureAirports
 * @property {Object} departureAirports.[<name>]
 * @property {string} departureAirports.<name>.aiportCode
 * @property [Object] departureAirports.<name>.avail_dest
 * @property {string} departureAirports.<name>.avail_dest[i].displayName
 * @property {string} departureAirports.<name>.avail_dest[i].aiportCode
 */

/**
 * Interface that wrapps all the autcomplete contexts. 
 * 
 * @param {string} context
 * @param {Config} cfg
 * @returns
 */
function autocomplete (context, cfg) {
    config = cfg;
    return _autocomplete[context];
}

/**
 * Private autcomplete contexts mapping
 * 
 */
var _autocomplete = {
    /**
     * Departure autocomplete object
     */
    departure_airport: {
        /**
         * Given an input, get suggestions that contains it.
         * @param {string} input
         * @param {function} callback
         */
        for: function (input, callback) {
            var results = Object.keys(config.departureAirports)
                            .filter(function (item, idx) {
                                return item.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            });
            return callback(null, results);
        }
    },
    /**
     * Destination autocomplete object
     */
    destination: {
         /**
         * Given an input and a departure airport, get suggestions that contains the input within the valid.
         * destination airports for the given departure airport
         * @param {string} input
         * @param {function} callback
         */
        for: function(input, departure_airport, callback) {
            try{
                var destinations = config.departureAirports[departure_airport].avail_dest;            
                var results = [];
                destinations.forEach(function (item) {
                    if(item.displayName.toLowerCase().indexOf(input.toLowerCase()) >= 0) results.push(item.displayName);
                });
            } catch(err) {
                var error = err;
            }
            return callback(error || null, results);
        }
    }
};

/**
 * Public interface
 */
export default autocomplete;