'use strict';
const path = require('path');

module.exports = {
  entry: {
    javascript: './index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'var',
    library: 'SDK'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' }
    ]
  },
  inline: true,
  progress: true,
  colors: true
};
