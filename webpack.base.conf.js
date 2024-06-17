
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
// const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
};
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/app/**/index.js'));

    Object.keys(entryFiles).forEach(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/app\/(.*)\/index\.js/);

        const pageName = match && match[1];
        entry[pageName] = entryFile;
        // https://github.com/jantimon/html-webpack-plugin#options
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                inlineSource: '.css$',
                template: path.join(__dirname, `../src/app/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                excludeChunks: ['common'],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
                favicon: path.resolve('favicon.ico')
            }),
        );
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3,
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    // 'eslint-loader',
                ],
            },

            // {
            //     test: /\.(png|jpg|jpeg|gif|svg)$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 4000,
            //         name: 'img/[name][hash:8].[ext]',
            //         // publicPath: '/images/',
            //         esModule: false
            //     },
            // },
            {
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    name: 'fonts/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name][hash:8][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    // Disables attributes processing
                    // sources: false,
                    esModule: false,
                },
                include: [
                    path.resolve(__dirname, "../src/components"),
                ],
            },

        ],
    },
    plugins: [
        // new PurgeCSSPlugin({
        //     // paths: glob.sync(`${PATHS.src}/app/**/*`, { nodir: true }),
        //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        // }),
        new StyleLintPlugin({
            context: path.join(__dirname, '../src'),
            files: ['**/*.{html,vue,css,sass,scss}'],
            fix: false,
            cache: true,
            emitErrors: true,
            failOnError: false,
        }),
        new FriendlyErrorsWebpackPlugin(),
        // 直接插入基础库，可以以 cdn 的形式
        new HtmlWebpackTagsPlugin({
            append: false,
            scripts: [
                // { path: '../node_modules/lib-flexible/flexible.js' },
            ],
        }),
        new CopyPlugin({
            patterns: [
                { from: path.join(__dirname, '../public'), to: path.join(__dirname, '../dist') },
                { from: path.join(__dirname, '../src/assets/img/logos'), to: path.join(__dirname, '../dist/img/logos') },

            ],
        }),

    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minRemainingSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            usedExports: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 2,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                wangeditor: {
                    test: /[\\/]node_modules[\\/]_?wangeditor(.*)/,
                    name: 'wangeditor',
                    priority: 10,
                    reuseExistingChunk: true,
                },
                moment: {
                    test: /[\\/]node_modules[\\/]_?moment(.*)/,
                    name: 'moment',
                    priority: 10,
                    reuseExistingChunk: true,
                },
                // common: {
                //     minChunks: 2,
                //     priority: -20,
                //     name: 'common',
                //     reuseExistingChunk: true,
                //     minSize: 0,
                // },
            },
        },
    },
    // stats: 'errors-only',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src'),
            // "@api": path.resolve(__dirname, '../src/api/index.js'),
        },
    },
};
