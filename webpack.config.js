var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var webpackConfig = {
  entry: {
    index: './src/index.js',
    earth: './src/example/earth/index.js',
    flights: './src/example/flights/index.js'
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[id].[hash].js'
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json',
      exclude: /node_modules/
    }]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },

  devtool: 'eval-source-map',
  devServer: {
    quiet: false,
    noInfo: false,
    publicPath: '/',
    stats: {
      colors: true
    }
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'example/earth.html',
      template: 'src/example/earth/index.html',
      inject: true,
      chunks: ['earth']
    }),
    new HtmlWebpackPlugin({
      filename: 'example/flights.html',
      template: 'src/example/flights/index.html',
      inject: true,
      chunks: ['flights']
    })
  ]
};

module.exports = webpackConfig;
