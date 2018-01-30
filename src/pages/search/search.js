import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import {
  InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);

let {
  keyword,
  id
} = qs.parse(location.search.substr(1))
new Vue({
  el: '.container',
  data() {
    return {
      keyword,
      searchLists: null,
      isShow: false,
      searchLists: false,
      pageNum: 1,
      pageSize: 8,
      loading: false,
      allLoaded: false
    }
  },
  created() {
    this.getSearchLists()
  },
  methods: {
    getSearchLists() {
      if (this.allLoaded) { //如果数据给数据加载完就停止
        return
      }
      this.loading = true
      axios({
        methods: 'get',
        url: url.searchList,
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyword,
          id
        }
      }).then((res) => {
          console.log(res)
        let data = res.data.lists
        if (data.length < this.pageSize) { //判断是否所有数据已经加载完
          this.allLoaded = true
        }
        if (this.searchLists) { //如果数据存在就拼接，不存在就赋值
          this.searchLists = this.searchLists.concat(data)
        } else {
          this.searchLists = data
        }
        this.pageNum++
        this.loading = false
      })
    },
    move() { //使用一些dom的api来实现backTop是否显示问题
      if (document.documentElement.scrollTop > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    backTop() { //使用了vue的一个js动画库Velocity-animate，做出返回顶部的动画效果
      Velocity(document.body, 'scroll', {
        duration: 1000
      })
      document.documentElement.scrollTop = 0
    }
  },
  mixins: [mixin]
})
