const uuid = require('uuid');
const EventEmitter = require('events').EventEmitter;
const socket = require('./socket');

function query (config, params, options) {
  options = options || {};
  const queryId = uuid.v4();
  const connection = socket(config);
  const ee = new EventEmitter();

  function normalise (params) {
    if (typeof params.entities === 'string') {
      params.entities = [params.entities];
    }
    params.entities = params.entities || [];
    return params;
  }

  function join () {
    connection.write({ action: 'join', room: queryId });
  }
  function leave () {
    connection.removeListener('reconnected', join);
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
      if (data.type === 'end' || data.type === 'error') {
        leave();
        clearTimeout(timer);
      }
      ee.emit(data.type, data.data);
    }
  });

  const args = {
    action: 'query',
    room: queryId,
    params: normalise(params),
    version: config.version
  };

  if (config.lambda) {
    args.lambdaFunctionName = config.lambda;
  }

  connection.write(args);
  ee.id = queryId;

  ee.result = function (callback) {
    const buffer = [];
    ee.on('result', buffer.push);
    ee.on('error', callback);
    ee.on('end', () => { callback(null, buffer); });
    return ee;
  };

  return ee;
}

module.exports = query;
