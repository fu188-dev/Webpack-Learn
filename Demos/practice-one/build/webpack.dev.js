const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map", // 错误定位器
    devServer: {
        static: "./dev_dist",
        port: 9999, // 指定端口
        open: true, // 当服务器启动后，自动打开默认浏览器浏览
        // open: ["/my-page"], // 打开单个指定页面
        // open: ["/my-page", "/another-page"], // 打开多个指定页面
        hot: true, // 启用 webpack 的模块热替换：https://webpack.docschina.org/concepts/hot-module-replacement/
        // client: {
        //     progress: true, // 在浏览器中显示编译进度
        // },
        // 启用代理
        // proxy: {
        //     "/api": "http://localhost:3000", // 所有接口有带 /api 的都将代理到http://localhost:3000
        //     pathRewrite: { 
        //         "^/api": "", // 如果不希望/api传递，就将其替换成""
        //     },
        // },
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dev_dist"),
        clean: true,
    },
});