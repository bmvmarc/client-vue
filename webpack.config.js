const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    "mode": "development",
    entry: {
      main: "./src/main.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[hash].js"
    },

    devServer: {
      port: 5000
    },

    plugins: [
      new HtmlWebpackPlugin({template: "./src/index.html"}),
      new CleanWebpackPlugin,
      new VueLoaderPlugin(),
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
