const Primus = require('primus');
const http = require('http');

module.exports = function () {

  const emitters = {};
  const queues = {};

  const server = http.createServer();

  const primus = Primus(server, {
    transformer: 'engine.io'
  });
  primus.on('connection', (socket) => {
    socket.on('data', (msg) => {
      if (msg.action === 'query') {
        msg.id = msg.room;
        addEmitter(msg, (data) => {
          data.id = msg.id;
          socket.write(data);
        });
      }
    });
  });

  function addEmitter (q, fn) {
    emitters[q.id] = fn;
    // flush any results which have been queued
    queues[q.id] = queues[q.id] || [];
    while (queues[q.id].length) {
      fn(queues[q.id].shift());
    }
  }

  return {
    start: function (callback) {
      server.listen(0, (err) => {
        const address = server.address();
        const host = address.address === '::' ? 'localhost' : address.address;
        callback(err, `http://${host}:${address.port}`);
      });
    },
    stop: function (callback) {
      server.close();
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
