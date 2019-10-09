const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpuckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const projectFolder = 'template';
const projectPath = `./app/src/${projectFolder}`;

module.exports = {
  context: __dirname,

  entry: {
    index: `${projectPath}/index.ts`
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css'
    }),
    new HtmlWebpuckPlugin({
      template: `${projectPath}/index.html`,
      filename: 'index.html',
      cache: true,
      hash: true,
      inject: false
    }),
    new WebpackMd5Hash()
  ],

  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    index: 'index.html',
    host: 'localhost',
    port: 3000,
    compress: true,
    overlay: true,
    writeToDisk: true
  }
}
