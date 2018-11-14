const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const fs = require('fs');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

let templates = [];
let dir = 'src';
let files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.match(/\.pug$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: dir + '/' + filename + '.pug',
        filename: filename + '.html'
      })
    );
  }
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ["es2015"]
          }
        }
      },
      {
        test: /\.pug$/,
        // include: [
        //   path.resolve(__dirname, "./src/pug")
        // ],
        use: [
          // "html-loader",
          "raw-loader",
          {
            loader: "pug-html-loader",
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          "css-loader",
            
          "postcss-loader",
         "sass-loader",
           
        ]
      }
    ]
  },
  plugins: [
    ...templates,
    // new HtmlWebpackPlugin({
    //   template: "./src/index.pug",
    //   filename: "./index.html"
    // }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    })
  ]
};