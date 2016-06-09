var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve('src'),
  entry: [
    './index'
  ],
  output: {
    path: path.resolve('build/'),
    publicPath: '/public/assets/',
    filename: 'bundle.js'
  },
  plugins:[
    new ExtractTextPlugin("style.css")
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
      //loader: "style-loader!autoprefixer-loader!css-loader");
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      //loader: "style-loader!autoprefixer-loader!sass-loader");
      loader:  ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }
  ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'public'
  }
};
