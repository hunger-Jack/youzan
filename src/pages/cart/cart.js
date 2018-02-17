import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

new Vue({
  el: '.container',
  data() {
    return {
      cartLists: null
    }
  },
  computed: {
    AllSelected: {//使用计算属性实现最下方的全选功能
      get() {
        if(this.cartLists&&this.cartLists.length) {
            return this.cartLists.every(shop=>{//使用every的api实现，如果所有的商品被选中，左下方的全选自动选中，如果有一个商品没有选中，全选就不选中。
                return shop.checked
            })
        }
        return false
      },
      set(newVal) {//使购物车所有商品被选中和不被选中。
        this.cartLists.forEach(shop=>{
            shop.checked = newVal
            shop.goodsList.forEach(good=>{
                good.checked = newVal
            })
        })
      }
    }
  },
  methods: {
    getLists() {
      axios.post(url.cartList).then((res) => { //由于vue响应式原理，在这里必须先初始化处理数据，后赋值。
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.goodsList.forEach(good => {
            good.checked = true
          })
        });
        this.cartLists = lists //这样的话就不要Object.assign()了
      })
    },
    selectGood(shop, good) {
      good.checked = !good.checked
      shop.checked = shop.goodsList.every(good => {//使用every的api实现如果全部商品被选择，店铺就自动被选择。
        return good.checked
      })
    },
    selectShop(shop) {//使此商铺下的所有商品选中或不被选中
      shop.checked = !shop.checked
      shop.goodsList.forEach(good => {
        good.checked = shop.checked
      })
    },
    selectAll() {//改变全选状态，触发AllSelected的set。
        this.AllSelected = !this.AllSelected
    }
  },
  created() {
    this.getLists()
  },
  mixins: [mixin]

})
