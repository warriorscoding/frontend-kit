const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const common = require('./webpack.common.config');

module.exports = {
    mode: 'production',
    entry: common.entry,
    output: common.output,
    optimization: common.optimization,
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'sass-loader'
                ]
            },
            ...common.module.rules
        ]
    },
    plugins: [
        // this plugin will delete every file from build before generating new file

        new CleanWebpackPlugin(),

        // to extrect css file

        new MiniCssExtractPlugin({
            filename: `assets/[name].[contenthash:4].css`
        }),

        // below are the html file we will generate

        ...common.plugins
    ]
}