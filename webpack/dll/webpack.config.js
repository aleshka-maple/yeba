const webpack = require("webpack");

module.exports = {
    entry: {
        vendors: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].dll.js",
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: __dirname + '/build/[name].manifest.json'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
