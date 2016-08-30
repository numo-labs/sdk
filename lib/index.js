const query = require('./query');

module.exports = function (config) {
  config = Object.assign({
    url: 'http://localhost:9182',
    timeout: 30
  }, config);
  return {
    query: function (params, options) {
      return query(config, params, options);
    }
  };
};
