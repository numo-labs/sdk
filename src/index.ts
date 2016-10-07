"use strict";
import autocomplete from './lib/autocomplete';
import {ukConfig} from './uk-config';

interface SDKprototype {
    config: any;
    configMarket: any;
    autocomplete: any;
}

interface SDK {
    init: Function;
}

var SDK = (function (): SDK {
    var markets = {
        uk: ukConfig
    };
    
    /**
     * SDK prototype
     *
     */
    var SDK = function () {
        this.config = null;
        this.configMarket = function (market: string) {
            this.config = markets[market] || null;
        };
        this.autocomplete = function(context: string) {
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
    function init(market: string): SDKprototype {
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
// Public interface.
export default SDK;
