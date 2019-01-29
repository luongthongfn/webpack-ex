const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const globImporter = require('node-sass-glob-importer');

const ConcatPlugin = require('webpack-concat-plugin');

const fs = require('fs');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const IP = require('ip');
const DIST = 'dist';
const HOST = IP.address();
const PORT = 3000;

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
        filename: filename + '.html',
        inject: false
      })
    );
  }
});

module.exports = (env, argv) => {
  console.log('\x1b[33m'); //color
  console.log('~'.repeat(80));
  console.warn('~~~ webpack mode :', argv.mode)
  console.log('~'.repeat(80));
  console.log('\x1b[0m') // reset color
  // console.log('argv: ', argv)

  return {
    mode: argv.mode,
    entry: {
      custom: './src/index.js',
      GoogleMap: './src/js/entry/GoogleMap.js',

    },
    output: {
      path: path.resolve(__dirname, DIST),
      // filename: "js/[name].js",
      filename: "js/[name].js",
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
                outputPath: '../img/',
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
            argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: argv.mode === 'production' ? false : 'inline',
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('cssnano')(),
                  autoprefixer({
                    browsers: [
                      "> 1%",
                      "last 2 versions",
                      "not ie <= 8"
                    ]
                  })
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                importer: globImporter(),
                sourceMap: true
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

          ]
        },
      ]
    },
    plugins: [
      ...templates,

      new HtmlWebpackPugPlugin(),

      new MiniCssExtractPlugin({
        filename: "css/style.css",
        chunkFilename: "[id].css"
      }),


    ],
    devServer: {
      contentBase: path.join(__dirname, DIST),
      host: HOST,
      port: PORT,
    },

    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    // optimization: {
    //   minimize: false
    // }
  }
};