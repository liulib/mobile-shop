# mobile-shop

>vue + vant 搭建的移动端商城，主要完成了前端，后端接口使用了别的小伙伴的项目，有几个奇怪的bug待解决


## 相关技术栈

前端：vue + vue-router + vuex + axios + less + vant +better-scroll

后端：本项目只完成了前端，后端接口完全使用的在GitHub上找到的一个koa项目 https://github.com/hanyucd/vue-mall-mobile/tree/master/server


## 线上地址

[shop.liulib.com](http://shop.liulib.com/)


## 运行项目

前端，进入目录文件，首先 npm i安装相关依赖。

后端，进入目录文件，首先 npm i安装相关依赖，第一次运行项目，得先浏览器访问 localhost:3000，执行初始化数据导入数据库任务。


## 移动端适配方案

使用vw/vh方案进行移动端适配，为了更方便使用，安装了[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)这个插件，自动的将px单位自动转换成viewport单位。

配置文件如下，主要注意的就是 viewportWidth: 320,viewportHeight: 640,这代表着设计师给我们的原图尺寸，然后插件就可以根据我们设置的大小自动转换

```
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 320,
      viewportHeight: 640,
      unitPrecision: 3,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}

```

## 实现的功能

- [x] 商城首页板块展示
- [x] 商品详情
- [x] 商品评论
- [x] 商品搜索
- [x] 注册 / 登录 / 短信验证
- [x] 用户认证
- [x] 购物车功能
- [x] 用户信息修改
- [x] 地址管理 / 地址修改
- [x] 收藏商品
- [x] 浏览历史

## TODO 

- [ ] vant的tabs样式bug
- [ ] better-scroll有时候会卡死问题
- [ ] 打包后nginx奇怪的bug https://segmentfault.com/a/1190000016919340 文中第二个
- [ ] 懒加载比不使用懒加载更慢的奇怪bug，这个我真的傻了完全不知道为啥
