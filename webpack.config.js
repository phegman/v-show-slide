const path = require('path')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = [
  merge(config, {
    entry: {
      main: './src/main.js'
    }
  }),
  merge(config, {
    entry: {
      vSlide: './src/v-show-slide.js'
    },
    output: {
      filename: 'v-show-slide.js',
      libraryTarget: 'umd',
      library: 'v-show-slide',
      umdNamedDefine: true
    }
  })
]
