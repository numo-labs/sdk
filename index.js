
import autocomplete from './lib/autocomplete';
import {ukConfig} from './uk-config.js';

var SDK = (function () {
    var markets = {
        uk: ukConfig
    };
    
    /**
     * SDK prototype
     *
     */
    var SDK = function () {
        this.config = null;
        this.configMarket = function (market) {
            this.config = markets[market] || null;
        };
        this.autocomplete = function(context) {
            return autocomplete(context, this.config);
        }
    };
    
    // SDK instance variable
    var sdk;
    
    /**
     * Creates a SDK instance if there is no one currently instanciated. If there is
     * already one, it will just change the market configuration.
     *
     * @param {string} market
     * @returns
     */
    function init(market) {
        if(!sdk) {
            sdk = new SDK();
        }
        sdk.configMarket(market);
        return sdk;
    }
    
    
    /**
     * Public interface
     */
    return { init: init };
})();
// Just return a value to define the module export.
module.exports = SDK;
