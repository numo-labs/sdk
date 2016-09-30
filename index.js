import autocomplete from './lib/autocomplete';
import {ukConfig} from './uk-config.js';

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([autocomplete, ukMarket], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(autocomplete, ukConfig);
    } else {
        // Browser globals (root is window)
        window.SDK = factory(autocomplete, ukConfig);
    }
}(function (autocomplete, ukConfig) {
    'use strict';
    

    
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
    // This example returns an object, but the module
    // can return a function as the exported value.
    return SDK;
}));
