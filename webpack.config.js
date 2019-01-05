'use strict';

const path = require('path');
var webpack = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extensions: [".jsx", ".json", ".js"]
    },
    entry: {
        home: './src/react/pages/home.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        pathinfo: true,
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        }]
    },
    plugins: [

    ],

    context: path.resolve(__dirname)

};
