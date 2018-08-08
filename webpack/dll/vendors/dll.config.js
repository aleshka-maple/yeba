const webpack = require("webpack");

module.exports = {
    entry: {
        'vendors': [__dirname + '/config.js']
    },
    output: {
        path: __dirname,
        filename: "dll.js",
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: 'webpack/dll/vendors/manifest.json'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
