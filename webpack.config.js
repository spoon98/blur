//https://github.com/shakacode/bootstrap-loader
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: path.resolve('src'),
  entry: [
    'font-awesome-loader',
    'bootstrap-loader',
    'tether',
    './index',
  ],
  output: {
    path: path.resolve('build/'),
    publicPath: '/public/assets/',
    filename: 'bundle.js'
  },
  plugins:[
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    })
  ],
  module: {
    preLoaders:[{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract("style", "css!postcss!")
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader:  ExtractTextPlugin.extract("style", "css!postcss!sass")
    },
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
      // loader: "url?limit=10000"
      loader: "url"
    },
    {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file'
    },

    // Bootstrap 4
    { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
    // Bootstrap 3
    //{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
  ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public'
  },
  postcss: [ autoprefixer ]
};
