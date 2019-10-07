const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    index: './app/src/template/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' },
      { test: /\.html$/, use: 'posthtml-loader' },
      { test: /\.css$/, use: 'postcss-loader' }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin()
  ]
}
