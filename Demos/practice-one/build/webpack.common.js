const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: "./src/app.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "my-app",
        }),
        new BundleAnalyzerPlugin({ // 包分析工具 webpack-bundle-analyzer：https://github.com/webpack-contrib/webpack-bundle-analyzer
            analyzerMode: "static", // 导出静态 html
            reportFilename: "../bundle-analysis.html",
            openAnalyzer: false, // 是否默认自动打开浏览器查看
        }),
    ],
    // 如果有多个入口，就需要添加如下配置
    // optimization: {
    //     runtimeChunk: 'single',
    // },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: { // 可以查看 https://www.babeljs.cn/docs/options 进行 options 配置
                        presets: ["@babel/preset-env"],
                    },
                },     
            },
            {
                test: /\.less$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader',
                ],
              },
        ],
    },
};