const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    compress: true
  }
})