var webpack = require('webpack');
var debug = ( process.env.NODE_ENV !== 'production' );

module.exports = {
  entry: './js/elevator.js',
  output: {
    filename: "minjs/elevator.min.js"
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
           plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
    }]
  },
  plugin: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};