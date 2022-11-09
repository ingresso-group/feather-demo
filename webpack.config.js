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
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            targets: "defaults",
                                        },
                                    ],
                                    "@babel/preset-react",
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.less$/i,
                    include: path.resolve(__dirname, "src"),
                    exclude: /node_modules/,
                    use: [
                        // compiles Less to CSS
                        "style-loader",
                        "css-loader",
                        "less-loader",
                    ],
                },
            ],
        },
        plugins,
    };
}
module.exports = Config;
