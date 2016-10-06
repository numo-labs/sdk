var webpack = require('webpack');

module.exports = {
     entry: './index.js',
     output: {
        path: './dist',
        filename: 'sdk.js',
        library: "SDK",
        libraryTarget: "var"
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
     ]
 };