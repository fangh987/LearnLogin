# web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
```bash
笔记说明
#初始化项目： vue init webpack 项目名字<项目名字不能用中文>
# 添加依赖，如element-ui,在package.json 中dependencies中添加
例如 
#  "dependencies": {
#    "element-ui": "^2.6.0"
#  }
# 全局引入该组件 参考 https://element.eleme.cn/#/zh-CN/component/quickstart 中快速上手中的全局映入方式
# 在启动时可能会出现警告或报错 Extra semicolon 等 
# 解决方案： 将config设置中的index.js中的useEslint:属性变成 false
# vue 与后台交互需要引入 axios 包依赖

```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
