const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './source/js/app.js'
  },
  output: {
    path: __dirname + "/public/js",
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    // new UglifyJsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // })
  ],
  watch: true
};
