const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const DIR_NAME = path.resolve('./');
const source = path.resolve('./');

const config = {
    context: path.resolve(DIR_NAME),
    entry: './app.ts',
    output: {
        path: path.resolve(DIR_NAME, 'dist'),
        filename: 'app.js',
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
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
                exclude: '/node_modules',
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

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
