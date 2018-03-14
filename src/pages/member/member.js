import Vue from 'vue'
import store from './store/index'
import router from './router/index.js'
/**
 * router-view组件渲染
 * 嵌套路由
 * 编程导航
 * router-link
 * 重定向
 * $router组件注入
 */


new Vue({
  el: '#app',
  router,
  store
})
