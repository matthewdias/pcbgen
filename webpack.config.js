const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/static/js',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './static/js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false,
            path: false
        },
        alias: {
            ejs: 'ejs/ejs.min.js'
        }
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    target: 'web',
};