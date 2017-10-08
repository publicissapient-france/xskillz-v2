const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GenerateFilePlugin = require('generate-file-plugin');

module.exports = {
    devtool: 'source-map',

    output: {
        publicPath: '/dist/'
    },

    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!postcss-loader!sass'
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                API_URL: '"/api"'
            },
            __DEVELOPMENT__: false
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new GenerateFilePlugin('app.info.js'),
    ]
};
