const Primus = require('primus');
const EventEmitter = require('events').EventEmitter;

module.exports = (config) => {
  config = config || {};
  const primus = new Primus(new EventEmitter(), {transformer: 'engine.io'});
  config.Socket = primus.Socket;
  return require('./lib')(config);
};
