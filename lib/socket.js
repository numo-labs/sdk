const connections = {};

function getConnection (Socket, url) {
  if (connections[url]) {
    return connections[url];
  } else {
    connections[url] = new Socket(url);
    return connections[url];
  }
}

function socket (config) {
  return getConnection(config.Socket, config.url);
}

module.exports = socket;
