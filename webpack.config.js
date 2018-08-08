const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const options = {};

const argv = {
    production: options.production || process.env.NODE_ENV === 'production' || false,
    logging: options.logging || false,
    stats: options.stats || false,
    buildNumber: options.buildNumber || 'local',
    maxThreads: parseInt(options.maxThreads) || false,
    watch: process.argv.indexOf('--watch') !== -1
};

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: '[name].js',
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less"]
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        modules: true,
                        minimize: true
                    }
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            { test: /\.ts|\.tsx$/, loader: 'ts-loader' }
        ]
    },

    watch: true,

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './**/dll.js', to: './dll', context: './webpack/dll'
            },
            /** Копируем в dist, т.к. загрузка index.html происходит из той же папки что и manifest.json */
            {
                from: './extension'
            }
        ]),
        new HtmlWebpackPlugin({
            template: './webpack/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./webpack/dll/vendors/manifest.json')
        }),
        new webpack.optimize.CommonsChunkPlugin({
           name: 'commonChunks'
        })
    ],

    stats: !argv.production ?
        {
            assets: true,
            children: false,
            timings: true,
            modules: true,
            chunkModules: false,
            excludeAssets: /((nls|Dictionaries|images|resources|fonts)\/|\.(map|html)$)/
        } :
        "errors-only"
};

