var webpack = require("webpack");
var path = require("path");
var nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    entry: {
        app: "./app/index"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        publicPath: "/"
    },
    target: "node",
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                "SOME_VALUE_FROM_ENVIRONMENT": JSON.stringify(process.env.SOME_VALUE_FROM_ENVIRONMENT)
            }
        })
    ]
};