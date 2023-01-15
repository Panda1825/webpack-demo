const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: "./src/js/index.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "../dist"),
    // filename: 输出文件名
    filename: "js/index.js",
    clean: true, // 自动将上次打包目录资源清空
  },
  // 加载器
  module: {
    rules: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: [
                MiniCssExtractPlugin.loader, 
                "css-loader"
            ],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                }
              },
              generator: {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename: "imgs/[hash:8][ext][query]",
              },
          },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
        // 指定检查文件的根目录
        context: path.resolve(__dirname, "../src"),
      }),
      new HtmlWebpackPlugin({
        // 以 public/index.html 为模板创建文件
        // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
        template: path.resolve(__dirname, "../index.html"),
      }),
      new MiniCssExtractPlugin({
        // 定义输出文件名和目录
        filename: "css/style.css",
      }),
      new CssMinimizerPlugin(),
  ],
  // 模式
  mode: "production",
  };