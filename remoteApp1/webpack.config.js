const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true,
  },
  devtool: false,
  devServer: {
    port: '4001',
    client: {
      logging: 'none',
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),

    new ModuleFederationPlugin({
      // 模块联邦名字，提供给其他模块使用
      name: 'remoteApp1',
      // 提供给外部访问的资源入口
      filename: 'remoteApp1.js',
      // 引用的外部资源列表
      remotes: {},
      // 暴露给外部的资源列表
      exposes: {
        /**
         *  ./Header 是让外部应用的使用时基于这个路径拼接引用路径，如：nav/Header
         *  ./src/Header.js 是当前应用的要暴露给外部的资源模块路径
         */
        './remoteApp1/Header': './src/Header.js',
      },
      // 共享模块，值当前被 exposes 的模块需要使用的共享模块，如lodash
      shared: {},
    }),
  ],
};
