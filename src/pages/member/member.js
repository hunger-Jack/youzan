import Vue from 'vue'
import Router from 'vue-router'
import Member from './components/Member.vue'
import Address from './components/Address.vue'
import Form from './components/Form.vue'
import All from './components/All.vue'

Vue.use(Router)


/**
 * router-view组件渲染
 * 嵌套路由
 * 编程导航
 * router-link
 * 重定向
 * $router组件注入
 */
let routes = [{
  path: '/',
  component: Member

}, {
  path: '/address',
  component: Address,
  children: [{
    path: '',
    redirect: 'all'
  }, {
    path: 'all',
    component: All
  }, {
    name: 'form',
    path: 'form',
    component: Form
  }]
}]

let router = new Router({
  routes
})

new Vue({
  el: '#app',
  router
})
