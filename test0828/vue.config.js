const { defineConfig } = require("@vue/cli-service");
module.exports = {
  lintOnSave: false, //关闭语法检查
  // module.exports = defineConfig({
  //   transpileDependencies: false // 暂时关闭代码格式检测
  // })
  // 配置反向代理
  // devServer:{
  //   proxy:{
  //     'kerwin' : {
  //       target:'https//m.maoyan.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //       '^/kerwin': ''
  //     }
  //   }}
};
