const common = require('./webpack.common.config');

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './build',
        open: true, 
        port: 1337,
    },
    devtool: 'source-map',
    entry: common.entry,
    output: common.output,
    optimization: common.optimization,
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: [
                    'style-loader', 'css-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: '/node_modules/',
                use: [
                    'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
                ]
            },
            ...common.module.rules
        ]
    },
    plugins: [
        // common plugins
        ...common.plugins
    ]
}