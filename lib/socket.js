const Primus = require('./primus');

const connections = {};

function getConnection (url) {
  if (connections[url]) {
    return connections[url];
  } else {
    connections[url] = new Primus(url);
    return connections[url];
  }
}

function socket (config) {
  return getConnection(config.url);
}

module.exports = socket;
