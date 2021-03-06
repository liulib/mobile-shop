/*
 * @Author       : liulib
 * @Date         : 2020-03-30 21:05:32
 * @LastEditors  : liulib
 * @LastEditTime : 2020-07-30 17:09:25
 */

const config = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      // 使用externals加载cdn
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
        // 'better-scroll': 'better-scroll'
        // vant: 'vant'
      })
      // 挂载参数isProd到index.html中 用它来定制首页内容
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      // 挂载参数isProd到index.html中 用它来定制首页内容
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}

module.exports = config
