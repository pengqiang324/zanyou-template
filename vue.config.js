const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9526 // dev port
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 设置别名 alias
    config.resolve.alias
        .set('@', resolve('src'))
  },
  lintOnSave:false,
  devServer: {
    port
  }
})
