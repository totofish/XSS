const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'extension/content': './src/extension/content.ts',
    'extension/GUI': './src/extension/GUI.tsx',
    'extension/background': './src/extension/background.ts',
    'extension/options': './src/extension/options.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'XSS')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devtool: false, //'source-map',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '.json', '.css', '.scss' ],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    { overrideBrowserslist: ['last 2 versions'] },
                  ],
                ],
              },
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ],
      }, {
        test: /\.(js|jsx|ts|tsx)$/,
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
};