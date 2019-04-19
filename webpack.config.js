//@ts-check
'use strict';

const path = require("path");
const merge = require("webpack-merge");
const outputPath = path.resolve(__dirname, 'dist');

/**@type {import('webpack').Configuration}*/
const commonConfig = {
    output: {
        path: outputPath,
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
}

const extensionConfig = merge(commonConfig, {
    target: 'node',
    entry: "./src/extension.ts",
    output: {
        filename: 'extension.js',
        libraryTarget: "commonjs2"
    },
    externals: {
        vscode: "commonjs vscode"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        "module": "commonjs"
                    }
                }
            }]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['raw-loader']
        }]
    }
})

const gamesConfig = merge(commonConfig, {
    target: 'web',
    entry: {
        Dino: "./src/Games/Dino/Dino.js"
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
})

module.exports = [extensionConfig, gamesConfig];