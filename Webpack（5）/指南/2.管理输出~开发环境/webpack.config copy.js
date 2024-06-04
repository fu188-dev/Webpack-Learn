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
        static: "./dist", // webpack-dev-server 将 dist 目录下的文件作为可访问资源部署在 localhost:8080
        // static: {
        //     directory: path.join(__dirname, "dist"),
        // },
        compress: true, // 利用 gzips 压缩 dist/ 目录钟的所有内容并提一个本地服务
        port: 9000, // 本地服务端口为 9000，也可以设置成自动 auto
        allowedHosts: "auto", // 允许 localhost、host、client.webSocketURL.hostname 访问开发服务器
        // bonjour: true, // 在启动时通过 ZeroConf 网络广播你的开发服务器。
        client: {
            // logging: "info",
            // overlay: true, // 当出现编译错误或警告时，在浏览器钟显示全屏覆盖。
            overlay: { // 如果只想显示错误信息
                errors: true,
                warnings: false,
            },
            progress: true, // 在浏览器钟以百分比显示编译进度。
        },
        // https: true, // 可以选择使用 HTTPS 提供服务，需要配置证书
        host: "0.0.0.0",
        hot: true, // 启用 webpack 的模块热替换特性。
        open: true, // 服务器启动后自动打开浏览器
        // open: ["/index"], // 服务器启动后自动打开指定页面
        // open: ["/home", "/one"], // 服务器启动后自动打开多个指定页面
        proxy: { // 启用代理
            "/api": "http://localhost:3000", // 对于 /api/users 的请求会将请求代理到 http://localhost:3000/api/users
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" }, // 如果不希望传递 /api ,就需要重写路径
                changeOrigin: true, // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 来覆盖此行为。
            },
        },
        // proxy: [ // 如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象数组：
        //     {
        //         context: ["/auth", "/api"],
        //         target: "http://localhost:3000",
        //     },
        // ],
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
    },
    // 由于单个 HTML 页面有多个入口，所以添加了这个配置，需要去重和分离chunk
    optimization: {
        runtimeChunk: "single",
    },
}