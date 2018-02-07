import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
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
      details: null,
      changeTabs,
      curIndex: 0,
      dealLists: null,
      loading: false,
      bannerLists: []
    }
  },
  methods: {
    getDetails() {
      axios.post(url.details, {
        id
      }).then((res) => {
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
    }
  },
  created() {
    this.getDetails()
  },
  components: {
    Swipe
  },
  mixins: [mixin]
})
