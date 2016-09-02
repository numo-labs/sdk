const Backend = require('sdk-backend');

module.exports = function () {

  const emitters = {};
  const queues = {};

  const TestProvider = {
    willHandle: (q) => {
      // don't handle queries which have a `handle` param set to false
      return !q || !q.params || q.params.handle !== false;
    },
    query: (q, emit) => {
      emitters[q.id] = emit;
      // flush any results which have been queued
      queues[q.id] = queues[q.id] || [];
      while (queues[q.id].length) {
        emit(queues[q.id].shift());
      }
    },
    name: 'test-provider'
  };
  const backend = Backend({
    providers: [
      TestProvider
    ],
    port: 0,
    log: {
      level: process.env.LOG_LEVEL || 'fatal'
    }
  });

  return {
    start: function (callback) {
      backend.start((err, address) => {
        const host = address.address === '::' ? 'localhost' : address.address;
        callback(err, `http://${host}:${address.port}`);
      });
    },
    stop: function (callback) {
      backend.stop(callback);
    },
    emit: function (id, type, data) {
      data = data || {};
      data.type = type;
      if (emitters[id]) {
        emitters[id](data);
      } else {
        queues[id] = queues[id] || [];
        queues[id].push(data);
      }
    }
  };
};
