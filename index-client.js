'use strict';

module.exports = (config) => {
  config = config || {};
  config.Socket = require('./lib/primus');
  return require('./lib')(config);
};
