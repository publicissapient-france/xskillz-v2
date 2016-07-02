const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');

const development = require('./dev.config.js');
const production = require('./prod.config.js');

const ENV = process.env.NODE_ENV;

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist')
};

process.env.BABEL_ENV = ENV;

const common = {
    entry: [
        PATHS.app
    ],

    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.scss'],
        modulesDirectories: ['node_modules', PATHS.app]
    },

    module: {
        loaders: [
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=2048&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=2048&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=2048&mimetype=application/octet-stream'
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=2048&mimetype=application/font-otf'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=2048&mimetype=image/svg+xml'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=2048'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },

    postcss: (webpack) => {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            }),
            postcssImport({
                addDependencyTo: webpack
            })
        ];
    }
};

if (!ENV) {
    module.exports = merge(development, common);
}

if (ENV === 'production') {
    module.exports = merge(production, common);
}