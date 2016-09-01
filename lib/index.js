const query = require('./query');
const pkg = require('../package.json');

module.exports = function (config) {
  config = Object.assign({
    url: 'http://localhost:9182',
    timeout: 30
  }, config);
  config.version = pkg.version;
  return {
    query: function (params, options) {
      return query(config, params, options);
    }
  };
};
