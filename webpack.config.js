'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
        //代码入口配置,可以配置多个
        index: ['webpack-dev-server/client?http://localhost:3000',
            // 热更新的入口配置
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(__dirname, 'app', 'index.js')],
        index2:['webpack-dev-server/client?http://localhost:3000',
            // 热更新的入口配置
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(__dirname, 'app', 'index2.js')]
    },
	output: {
        path: path.join(__dirname, 'dist'),
		filename: '[name].js',
        publicPath: '/'
	},
    plugins: [
        // 配置多个
        new HtmlWebpackPlugin({
            template: './app/index.tpl.html',
            inject: 'body',
            filename: './index.html',
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            template: './app/index.tpl.html',
            inject: 'body',
            filename: './index2.html',
            chunks:["index2"]
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
	mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: ['.js','.jsx','.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:
                    {
                        presets:['react','es2015']
                    }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    }
};