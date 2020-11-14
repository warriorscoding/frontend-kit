const path = require('path');

const { plugins, entries, pug_html_loader } = require('./configs/loader.js');


const config = {
    entry: entries,
    output: {
        publicPath: '',
        path: path.resolve('./build'),
        filename: 'assets/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[contenthash].[ext]'
                    }
                }
            },
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    pug_html_loader
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // below are the html file we will generate
        ...plugins
    ]
}; 

module.exports = config;