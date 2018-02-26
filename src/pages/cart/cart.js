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
      cartLists: null,
      total: 0,
      editingShop: null //判断是否在编辑状态下，储存处于编辑状态下的商铺shop信息
    }
  },
  computed: {
    allSelected: { //使用计算属性实现最下方的全选功能。正常状态下的全选
      get() {
        if (this.cartLists && this.cartLists.length) {
          return this.cartLists.every(shop => { //使用every的api实现，如果所有的商品被选中，左下方的全选自动选中，如果有一个商品没有选中，全选就不选中。
            return shop.checked
          })
        }
        return false
      },
      set(newVal) { //使购物车所有商品被选中和不被选中。
        this.cartLists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: { ////使用计算属性实现最下方的全选功能。编辑状态下的全选
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
        return false
      },
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      }
    },
    selectedGoods() { //结算状态和对应操作，根据选中商品长度计算。
      let arr = []
      let total = 0
      if (this.cartLists && this.cartLists.length) {
        this.cartLists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
      }
      this.total = total
      return arr
    },
    removeGoods() {//被选中删除商品列表
      let arr = []
      if(this.editingShop) {
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  methods: {
    getLists() { //获取购物车数据
      axios.post(url.cartList).then((res) => { //由于vue响应式原理，在这里必须先初始化处理数据，后赋值。
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.editingMsg = '编辑' //文字信息‘编辑’或者'完成'，默认给‘编辑’
          shop.isEditing = false //是否在编辑状态，默认否
          shop.removeChecked = false //在编辑状态下是否被选中
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false //在编辑状态下是否被选中
          })
        });
        this.cartLists = lists //这样的话就不要Object.assign()了
      })
    },
    selectGood(shop, good) { //使用every的api实现如果全部商品被选择，店铺就自动被选择。
      let selectOrEdit = this.editingShop ? 'removeChecked' : 'checked' //使用一个变量来缓存【编辑】或【完成】状态，使用三元运算符判断
      good[selectOrEdit] = !good[selectOrEdit]
      shop[selectOrEdit] = shop.goodsList.every(good => {
        return good[selectOrEdit]
      })
    },
    selectShop(shop) { //使此商铺下的所有商品选中或不被选中
      let selectOrEdit = this.editingShop ? 'removeChecked' : 'checked' //使用一个变量来缓存【编辑】或【完成】状态，使用三元运算符判断
      shop[selectOrEdit] = !shop[selectOrEdit]
      shop.goodsList.forEach(good => {
        good[selectOrEdit] = shop[selectOrEdit]
      })
    },
    selectAll() { //改变全选状态，触发allSelected的set。
      let selectOrEdit = this.editingShop ? 'allRemoveSelected' : 'allSelected' //使用一个变量来缓存【编辑】或【完成】状态，使用三元运算符判断
      this[selectOrEdit] = !this[selectOrEdit]
    },
    edit(shop, shopIndex) {
      shop.isEditing = !shop.isEditing
      shop.editingMsg = shop.isEditing ? '完成' : '编辑' //通过当前shop的isEditing判断显示文字
      this.cartLists.forEach((item, index) => {
        if (shopIndex !== index) { //通过v-for传过来的shopIndex和cartLists循环的index判断不在编辑状态的文字
          // item.isEditing = false
          item.editingMsg = shop.isEditing ? '' : '编辑'
        }
      })
      this.editingShop = shop.isEditing ? shop : null //需要一个全局变量处理下方的‘删除’和‘结算’状态
    }
  },
  created() {
    this.getLists()
  },
  mixins: [mixin]

})
