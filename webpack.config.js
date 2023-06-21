const path = require('path');

const DIR_NAME = path.resolve('./');
const source = path.resolve('./');

const mode = 'development';

module.exports = {
    mode,
    context: path.resolve(DIR_NAME),
    entry: './app.ts',
    output: {
        path: path.resolve(DIR_NAME, 'dist'),
        filename: 'app.js',
        clean: true,
        publicPath: '/',
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|d.ts|.js)$/i,
                include: source,
                loader: 'ts-loader',
                exclude: '/node_modules',
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.mjs$/,
                type: 'javascript/auto',
            },
        ],
    },

    target: 'node',
    resolve: {
        extensions: ['.js', '.ts', '.d.ts', '.jsx', '.tsx'],
        alias: {
            Api: path.resolve(DIR_NAME, 'src/api/'),
            Commands: path.resolve(DIR_NAME, 'src/commands/'),
            Classes: path.resolve(DIR_NAME, 'src/classes/'),
            Constants: path.resolve(DIR_NAME, 'src/constants/'),
            Helpers: path.resolve(DIR_NAME, 'src/helpers/'),
            Images: path.resolve(DIR_NAME, 'src/images/'),
            Middleware: path.resolve(DIR_NAME, 'src/middleware/'),
            Models: path.resolve(DIR_NAME, 'src/models/'),
            Repositories: path.resolve(DIR_NAME, 'src/repositories/'),
            Scenes: path.resolve(DIR_NAME, 'src/scenes/'),
            Services: path.resolve(DIR_NAME, 'src/services/'),
            Types: path.resolve(DIR_NAME, 'src/types/'),
            Config: path.resolve(DIR_NAME, 'src/config/'),
        },
        fallback: {
            crypto: false,
            util: false,
            timers: false,
            stream: false,
            assert: false,
            http: false,
            https: false,
            os: false,
            url: false,
            zlib: false,
            constants: false,
            querystring: false,
            fs: false,
            'mongodb-client-encryption': false,
            aws4: false,
            snappy: false,
            '@aws-sdk/credential-providers': false,
            '@mongodb-js/zstd': false,
            kerberos: false,
        },
    },

    stats: {
        errorDetails: true,
    },
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
};
