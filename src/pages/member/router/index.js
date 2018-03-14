import Vue from 'vue'
import Router from 'vue-router'
import Member from '../components/Member.vue'
import Address from '../components/Address.vue'
import Form from '../components/Form.vue'
import All from '../components/All.vue'
Vue.use(Router)

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
    name: 'all',
    path: 'all',
    component: All
  }, {
    name: 'form',
    path: 'form',
    component: Form
  }]
}]

const router = new Router({
  routes
})

export default router
