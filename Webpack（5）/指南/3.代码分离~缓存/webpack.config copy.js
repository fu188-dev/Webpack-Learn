const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    // index: "./src/index.js",
    // another: "./src/another-module.js"
    index: {
        import: "./src/index.js",
        dependOn: "shared",
    },
    another: {
        import: "./src/another-module.js",
        dependOn: "shared",
    },
    shared: "lodash",

  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "Development",
        filename: "index.html"
    }),
],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: { // 如果在一个 HTMl 页面上有多个入口起点，选哟设置 optimization.runtimeChunk: 'single'，否则会遇到 https://bundlers.tooling.report/code-splitting/multi-entry/ 这里描述的麻烦
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all", //将模块分离到单独的 bundle 中
    },
  },
};