var webpack = require("webpack");
var path = require("path");
var nodeExternals = require("webpack-node-externals");
var StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
    mode: "development",
    entry: [
        "webpack/hot/poll?1000",
        "./app/index-dev"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        publicPath: "/"
    },
    watch: true,
    target: "node",
    externals: [
        nodeExternals({
            whitelist: [
                "webpack/hot/poll?1000"
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                }
            }
        ]
    },
    plugins: [
        new StartServerPlugin("app.js"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("app"),
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "SOME_VALUE_FROM_ENVIRONMENT": JSON.stringify(process.env.SOME_VALUE_FROM_ENVIRONMENT)
            }
        })
    ]
};