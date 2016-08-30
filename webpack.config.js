'use strict';
var path = require('path');

module.exports = {
  entry: {
    javascript: './index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    // export itself to a global var
    libraryTarget: 'var',
    // name of the global var: "Foo"
    library: 'SDK'
  },
  inline: true,
  progress: true,
  colors: true
};
