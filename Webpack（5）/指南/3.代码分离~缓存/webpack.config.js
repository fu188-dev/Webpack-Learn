const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",

  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "Caching",
        filename: "index.html"
    }),
    new BundleAnalyzerPlugin({ // 包分析工具 webpack-bundle-analyzer：https://github.com/webpack-contrib/webpack-bundle-analyzer
        analyzerMode: "static", // 导出静态 html
        reportFilename: "../bundle-analysis.html",
        openAnalyzer: false, // 是否默认自动打开浏览器查看
    }),
],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single", // 将 runtime 代码拆分为一个单独的 chunk 。single：为所有 chunk 创建一个 runtime bundle
    splitChunks: { // 将第三方库提取到单独的 vendor chunk 中。
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            },
        },

    },
  },
};