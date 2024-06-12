const path = require("path");


module.exports = (env) => {
    // 想要获取环境变量，必须要将 module.exports 换成一个函数。
    console.log("dddd",env.ENV);
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "webpack-numbers.js", // 将 src/index.js 打包到 dist/webpack-numbers.js 中。
            // library: "webpackNumbers", // 暴露库
            library: {
                name: "webpackNumbers", // 暴露库
                // 也可以为每种不同的方式指定一个名称
                // name: {
                //     root: "num1",
                //     amd: "num2",
                //     commonjs: "num3",
                // },
                type: "umd", // 这将在所有模块顶一下暴露你的库，允许它与 CommonJS、AMD和作为全局变量工作。
            },
            clean: true,
        },
        externals: { // 这里的配置意味着 webpackNumbers 这个库需要一个名为 lodash 的依赖，这个依赖在开发者环境中必须存在且可用。
            lodash: {
                commonjs: "lodash",
                commonjs2: "lodash",
                amd: "lodash",
                root: "_"
            },
        },
    }
};