const Primus = require('./primus');
const EventEmitter = require('events').EventEmitter;

const connections = {};

function getConnection (url) {
  if (connections[url]) {
    return connections[url];
  } else {
    connections[url] = connect(url);
    return connections[url];
  }
}

function connect (url) {
  return new Primus(url);
}

function socket (config) {
  return getConnection(config.url);
}

module.exports = socket;
