import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Swipe from '@/components/Swipe.vue'

/**
 * 使用官方提供的[c-cloak]解决刷新会显示源码问题
 */
let {
  id
} = qs.parse(location.search.substr(1))
let changeTabs = ['商品详情', '本店成交']
new Vue({
  el: '#app',
  data() {
    return {
      id,
      details: null,
      changeTabs,
      curIndex: 0,
      dealLists: null,
      loading: false,
      bannerLists: [],
      skuType: 0,//三种状态
      isShowSku: false,//是否显示遮罩层和规格选择弹框
      skuNum: 1,//购买数量
      isAddCart: false,//是否成功添加购物车
      isAddCartMessage: false//添加购物车成功弹窗信息
    }
  },
  methods: {
    getDetails() {
      axios.post(url.details, {
        id
      }).then((res) => {//进行数据改造，拿到的数据时字符串数组，轮播组件需要的是对象数组
        this.details = res.data.data
        res.data.data.imgs.forEach(item => {
          this.bannerLists.push({
            clickUrl: '',
            image: item
          })
        })
      })
    },
    changeTab(index) {
      this.curIndex = index
      if (this.curIndex === 1) {
        this.dealLists = null
        this.getDealLists()
      }
    },
    getDealLists() {
      this.loading = true
      axios.post(url.deal, {
        id
      }).then((res) => {
        this.loading = false
        this.dealLists = res.data.data.lists
      })
    },
    chooseSku(type) {//绑定规格选择，加入购物车，立即购买三种状态
      this.skuType = type
      this.isShowSku = true
    },
    chooseSkuNum(num) {//数量plus和minus，如果减少到数量为1，直接返回
      if(num<0 && this.skuNum === 1) return
      this.skuNum += num
    },
    addCart() {
      axios.post(url.addCart,{id,number:this.skuNum}).then((res) => {
        if(res.data.status === 200) {
          this.isShowSku = false
          this.isAddCart = true
          this.isAddCartMessage = true
          setTimeout(()=>{this.isAddCartMessage=false},1000)//加入购物车成功弹窗吗，给个定时器改变状态
        }
      })
    }
  },
  created() {
    this.getDetails()
  },
  watch: {
    isShowSku(newVal,oldVal) {//监听isShowSku,如果弹出阴影层，固定body和html宽度，如果没有就auto
      document.body.style.overflow = (newVal ? 'hidden' : 'auto')
      document.querySelector('html').style.overflow = (newVal ? 'hidden' : 'auto')
      // document.body.style.height = (newVal ? '100%' : 'auto')
      // document.querySelector('html').style.height = (newVal ? '100%' : 'auto')
    }
  },
  components: {
    Swipe
  },
  mixins: [mixin]
})
