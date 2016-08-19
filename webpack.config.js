var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var modules = ['earth', 'flights', 'linechart1'],
  entry = {
    index: './src/index.js'
  };

modules.forEach(function(name) {
  entry[name] = './src/example/' + name + '/index.js';
});

var webpackConfig = {
  entry: entry,

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
      loader: path.join(__dirname, "loader/json.js"),
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
    })
  ].concat(modules.map(function(name) {
    return new HtmlWebpackPlugin({
      filename: 'example/' + name + '.html',
      template: 'src/example/' + name + '/index.html',
      inject: true,
      chunks: [name]
    })
  }))
};

module.exports = webpackConfig;
