const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    output: {
     libraryTarget: 'var',
     library: 'Client'
    },
    optimization: {
      minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
        new Dotenv({
                     path: './.env', // load this now instead of the ones in '.env'
                     safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
                     allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
                     systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
                     silent: true, // hide any errors
                     defaults: false // load '.env.defaults' as the default values if empty.
    })

    ]
}
