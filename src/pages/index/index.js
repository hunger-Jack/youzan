import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import url from 'js/api'
import Foot from '@/components/Foot'
import Swipe from '@/components/Swipe'
import {
  InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);

var vm = new Vue({
  el: '#app',
  components: {
      Foot,Swipe
  },
  data() {
    return {
      hotLists: null,
      pageNum: 1,
      pageSize: 6,
      loading: false,
      allLoaded: false,
      bannerLists: null,
    }
  },
  methods: {
    getHotLists() {
      if (this.allLoaded) {//如果数据给数据加载完就停止
        return
      }
      this.loading = true
      axios({
        methods: 'get',
        url: url.hotLists,
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then((res) => {
        let data = res.data.lists
        if (data.length < this.pageSize) { //判断是否所有数据已经加载完
          this.allLoaded = true
        }
        if (this.hotLists) { //如果数据存在就拼接，不存在就赋值
          this.hotLists = this.hotLists.concat(data)
        } else {
          this.hotLists = data
        }
        this.pageNum++
        this.loading = false
      })
    },
    getBannerLists() {
        axios.get(url.banner).then((res) => {
            this.bannerLists = res.data.lists
        })
    }
  },
  created() {
    this.getHotLists()
    this.getBannerLists()
  }
})
