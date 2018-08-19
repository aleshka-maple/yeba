const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const argv = {
    production: process.env.NODE_ENV === 'production' || false,
    logging: process.env.logging || false,
    stats: process.env.stats || false,
    buildNumber: process.env.buildNumber || 'local',
    watch: process.argv.indexOf('--watch') !== -1
};

module.exports = {
    entry: {
        content: path.resolve('./src/content/content.ts'),
        devtools: path.resolve('./src/devtools/devtools.tsx'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".less"],
        modules: [path.resolve('./src'), 'node_modules']
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

    watch: argv.watch,

    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve('./src/manifest')
            }
        ]),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['devtools', 'commonChunks'],
            filename: 'devtools.html'
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve('./webpack/dll/build/*.dll.js'),
            includeSourcemap: false
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dll/build/vendors.manifest.json')
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

