const Backend = require('sdk-backend');

module.exports = function (responses) {
  const TestProvider = {
    willHandle: () => true,
    query: (q, emit) => {
      responses.forEach((response, i) => {
        setTimeout(() => {
          emit(Object.assign(response.body, { id: q.id, provider: TestProvider.name }));
          if (i === responses.length - 1) {
            setImmediate(() => {
              emit({ provider: TestProvider.name, type: 'end', id: q.id });
            });
          }
        }, response.delay);
      });
    },
    name: 'test-provider'
  };
  const backend = Backend({
    providers: [
      TestProvider
    ],
    port: 0,
    log: {
      level: 'fatal'
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
    }
  };
};
