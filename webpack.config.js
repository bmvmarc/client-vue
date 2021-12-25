const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack');

module.exports = {
    "mode": "development",
    entry: {
      main: "./src/main.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[hash].js"
    },
    devtool: 'inline-source-map',
    devServer: {
      port: 5000,
      historyApiFallback: true
    },

    plugins: [
      new HtmlWebpackPlugin({template: "./src/index.html"}),
      new CleanWebpackPlugin,
      new VueLoaderPlugin(),
        // Define Bundler Build Feature Flags
      new webpack.DefinePlugin({
        // Drop Options API from bundle
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: ["style-loader", "css-loader", "less-loader"]
        },
        
        {
          test: /\.(jpg|jpeg|png|svg)/,
          use: ["file-loader"]
        },
        
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }

      ]
    }

  }
