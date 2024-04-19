const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Plugin para minificar los archivos CSS en producción
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false
        }
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, 'css-loader']
      },
      {
        test:/\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
      {
        test:/\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // transpila codigo de ES6+(2017) ES12 A ES5 (2016)
          }
        }
      }

    ]
  },
  optimization: {
    minimize: true, // habilita la minimización de los archivos de salida
    minimizer: [
      new CssMinimizer(),
      new Terser(),
    ]
  },
  plugins: [
    new HtmlWebpack({
      template: './src/index.html'
    }),
    new MiniCssExtract({
      filename: '[name].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [{from: 'src/assets/', to:'assets/'}]
    })
  ]
}