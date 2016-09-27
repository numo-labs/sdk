
'use strict';

var autocomplete = require('./lib/autocomplete');

var markets = {
    uk: require('./uk-config.json')
};

var SDK = function () {
    this.config = null;
    this.configMarket = function (market) {
        this.config = markets[market] || null;
    };
    this.autocomplete = function(context) {
        return autocomplete(context, this.config);
    }
}


var sdk;

/**
 * Creates a SDK instance if there is no one currently instanciated.
 * @params
 */
function init(market) {
    if(!sdk) {
        sdk = new SDK();
    }
    sdk.configMarket(market);
    return sdk;
};

/**
 * Exposed interface
 */
module.exports = {init};