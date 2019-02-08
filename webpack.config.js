const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  externals: {},
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-webcam.min.js',
      libraryTarget: 'window',
      library: 'vue-webcam-new-min',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/WebCam.vue'),
    output: {
      filename: 'vue-webcam.js',
      libraryTarget: 'umd',
      library: 'vue-webcam-new',
      umdNamedDefine: true
    }
  })
];