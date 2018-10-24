const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'broswer/xss-helper': './src/broswer/xss-helper.js',
    'extension/content': './src/extension/content.js',
    'extension/GUI': './src/extension/GUI.js',
    'extension/background': './src/extension/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'XSS')
  },
  devtool: false, //'source-map',
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            },
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 versions']
                }),
              ],
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ],
      }, {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /(node_modules)/,
      },
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    modules: ['node_modules'],
  },
};