const merge = require('webpack-merge');
const devConfig = require('./webpack.config.dev');

module.exports = merge(devConfig, {
  mode: 'production',
  // for debugging/benchmark testing
  devtool: 'source-map'
});
