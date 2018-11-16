const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const globImporter = require('node-sass-glob-importer');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const fs = require('fs');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const srcPath = {
  js: {
    src: './src/js'
  },
  scss: {
    src: './src/scss'
  },
  pug: {
    src: './src/pug/pages'
  },
  img: {
    src: './src/img',
    dest: './img' // (form dist) actualy is : ./dist/img
  }
}

//pug compiler
let templates = [];
let dir = srcPath.pug.src;
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
//copy plugin
const CopyPlugin = process.env.NODE_ENV == 'production' ?
  new CopyWebpackPlugin([{
    from: srcPath.img.src,
    to: srcPath.img.dest
  }, ], { /* options */ }) :
  {}

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/custom.bundle.js",
  },
  externals: {
    jquery: 'jQuery'
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
        test: /\.(gif|png|jpe?g|woff|woff2|eot|ttf|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
              context: ''
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              importer: globImporter()
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          "raw-loader",
          {
            loader: "pug-html-loader",
            options: {
              pretty: true
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ]
      },
    ]
  },
  plugins: [
    ...templates,
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{
      from: srcPath.img.src,
      to: srcPath.img.dest
    }, ], { /* options */ }) 

  ]
};