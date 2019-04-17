//@ts-check
'use strict';

const path = require("path");

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node',
    entry: './src/extension.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    devtool: 'source-map',
    externals: {
        vscode: "commonjs vscode"
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@Games": path.resolve(__dirname, "Games")
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        "module": "es6"
                    }
                }
            }]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [{
                loader: 'html-loader'
            }]
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, ]
    }
}

module.exports = config;