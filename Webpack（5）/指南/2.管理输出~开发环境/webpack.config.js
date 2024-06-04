const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        print: "./src/print.js",
    },
    devtool: "inline-source-map", // 能够追踪发生错误的源代码位置
    devServer: {
        static: "./dist",
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            filename: "index.html"
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true, // 清理 /dist 文件夹
        publicPath: "/",
    },
    // 由于单个 HTML 页面有多个入口，所以添加了这个配置，需要去重和分离chunk
    optimization: {
        runtimeChunk: "single",
    },
}