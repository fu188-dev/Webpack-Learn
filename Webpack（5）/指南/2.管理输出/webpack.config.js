const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
        print: "./src/print.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "管理输出",
            filename: "index.html"
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true, // 清理 /dist 文件夹
    },
}