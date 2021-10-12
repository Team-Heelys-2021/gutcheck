const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals');


module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    // adding the below two lines while importing and installing node externals module stopped the too many files error,
    // but dev server still won't run (just no error message)
    // externalsPresets: { node: true },
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    mode: 'development',
    entry: ['@babel/polyfill', './client/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          ws: false,
          changeOrigin: true,
        },
      },
      historyApiFallback: true,
      hot: true,
      static: {
        directory: path.join(__dirname),
        publicPath: '/',
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.js?/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
    resolve: {
      extensions: ['.mjs', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
