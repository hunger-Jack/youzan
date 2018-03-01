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
      editingShop: null, //判断是否在编辑状态下，储存处于编辑状态下的商铺shop信息
      editingShopIndex: -1,
      removePopup: false,
      removeData: null,
      removeMsg: ''
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
    removeGoods() { //被选中删除商品列表
      let arr = []
      if (this.editingShop) {
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
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
      this.editingShopIndex = shop.isEditing ? shopIndex : -1
    },
    add(good) { //编辑状态下商品数量增加
      axios.post(url.addCart, {
        id: good.id,
        number: 1
      }).then((res) => {
        good.number++
      })
    },
    reduce(good) { //编辑状态下商品数量减少
      if (good.number === 1) return
      axios.post(url.removeCart, {
        id: good.id,
        number: 1
      }).then((res) => {
        good.number--
      })
    },
    remove(good, goodIndex, shop, shopIndex) { //单件商品的的删除
      this.removePopup = true
      this.removeData = {
        good,
        goodIndex,
        shop,
        shopIndex
      } //对象结构赋值全局储存数据
      this.removeMsg = '确认要删除该商品吗？'
    },
    removeConfirm() { //删除确认
      if (this.removeMsg === '确认要删除该商品吗？') { //通过removeMsg来判断是单个删除还是选择删除
        let {
          good,
          goodIndex,
          shop,
          shopIndex
        } = this.removeData
        axios.post(url.removeCart, {
          id: good.id
        }).then((res) => {
          shop.goodsList.splice(goodIndex, 1)
          if (!shop.goodsList.length) {
            this.cartLists.splice(shopIndex, 1)
            this.statusRecover()
          }
          this.removePopup = false
        })
      } else {
        let ids = []
        this.removeGoods.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.mRemoveCart, {
          ids
        }).then((res) => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let idx = this.removeGoods.findIndex(item => item.id === good.id) //使用findIndexde api
            if (idx === -1) { //没有勾选的商品放在一个新数组
              arr.push(good)
            }
          })
          if (arr.length) { //如果还有剩余没有被勾选商品，把正在编辑店铺的商品重新赋值为arr，由于响应式，cartLists也会改变。
            this.editingShop.goodsList = arr
          } else { // 如果arr为空，就证明全部商品被勾选，就要把这个正在编辑的店铺删除，然后还原状态。
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeSelected() { //右下角删除所选商品
      this.removeMsg = `确定将所选 ${this.removeGoods.length} 个商品删除？`
      this.removePopup = true
    },
    statusRecover() { //删除一个商铺时候状态还原
      this.editingShop = null
      this.editingShopIndex = -1
      this.cartLists.forEach(shop => {
        shop.editingMsg = '编辑'
        shop.isEditing = false
        shop.goodsList.forEach(good => {
          good.editingMsg = '编辑'
          good.isEditing = false
        })
      })
    }
  },
  created() {
    this.getLists()
  },
  mixins: [mixin]

})
