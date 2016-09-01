const uuid = require('uuid');
const EventEmitter = require('events').EventEmitter;
const socket = require('./socket');

function query (config, params, options) {
  options = options || {};
  const queryId = uuid.v4();
  const connection = socket(config);
  const ee = new EventEmitter();

  function join () {
    connection.write({ action: 'join', room: queryId });
  }
  function leave () {
    connection.off('reconnected', join);
    connection.write({ action: 'leave', room: queryId });
  }

  const timeout = options.timeout || config.timeout;
  const timer = setTimeout(() => {
    leave();
    ee.emit('timeout');
  }, timeout * 1000);

  connection.on('reconnected', join);
  connection.on('data', (data) => {
    if (data.id === queryId) {
      ee.emit('data', data);
      if (data.type === 'end') {
        leave();
        clearTimeout(timer);
      }
      ee.emit(data.type, data.data);
    }
  });

  connection.write({ action: 'query', room: queryId, params: params, version: config.version });
  ee.id = queryId;
  return ee;
}

module.exports = query;
