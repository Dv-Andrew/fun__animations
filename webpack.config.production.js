const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const projectFolder = process.env.PROJECT !== undefined ? process.env.PROJECT : 'template';
const projectPath = `./app/src/${projectFolder}`;

module.exports = {
  context: __dirname,
  mode: 'production',

  entry: {
    index: `${projectPath}/index.ts`
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].index.js'
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'], exclude: '/node_modules/' },
      {
        test: /\.html$/, use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash:16].[name].[ext]',
            outputPath: 'assets'
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].styles.css'
    }),
    new HtmlWebpackPlugin({
      template: `${projectPath}/index.html`,
      filename: 'index.html',
      minify: false,
      inject: true,
      hash: true,
      cache: true
    }),
    new WebpackMd5Hash()
  ]
};
