/*
    ./webpack.config.js
*/
const path = require("path");
const webpack = require("webpack");
const Uglify = require("uglifyjs-webpack-plugin");

function Config(env) {
  let plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV":
        env === "production"
          ? JSON.stringify("production")
          : JSON.stringify("development"),
    }),
  ];
  if (env === "production") {
    plugins.push(
      new Uglify({
        uglifyOptions: {
          ecma: 5,
          output: {
            comments: false,
          },
          compress: true,
        },
      })
    );
  }

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve("./build"),
      filename: "main.min.js",
    },
    resolve: {
      modules: [path.resolve("./src/"), path.resolve("./node_modules")],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["es2015-ie", "react"],
          },
        },
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["es2015-ie", "react"],
          },
        },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true, // true outputs JSX tags
              },
            },
          ],
        },
      ],
    },
    plugins,
    watch: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  };
}
module.exports = Config;
