import './category.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import Foot from '@/components/Foot'
import url from 'js/api'
/*
 * 模板页面有两套二级列表，一个是综合排行的，另一个是其他二级列表类型，因为连个页面排版不同，使用v-if来判断页面加载哪个
 * 如果v-if="topIndex===0&&rankData",如果当前的一级列表的索引是0并且rankData已经拿到数据，就渲染综合排行
 * 如果v-if="topIndex>0&&rankData",如果索引大于0并且拿到数据，就渲染其他已经列表分类，关键是都要拿到数据再去渲染
 * 使用3个函数来获取3中数据，分别是getTopLists()获取一级列表数据,getSubData()获取二级列表数据,getRankData()单独获取综合排行数据
 * 在dom渲染完成之前可以去拿一级列表数据和综合排行数据
 * 在点击二级tab获取二级列表数据时加以判断，如果index=0，就是获取就去获取综合排行数据，否则就获取其他二级列表数据
 * 给二级列表tab添加getSubData()click事件，传入（当前索引index，当前列表id）
 * 在获取二级列表时时需要当前列表的id参数的，才能获取当前列表对应的数据
 * 使用过滤器是的价格保留两位小数点
 */

new Vue({
  el: '#app',
  data() {
    return {
      topLists: null,
      subData: null,
      topIndex: 0,
      rankData: null
    }
  },
  components: {
    Foot
  },
  created() {
    this.getTopLists()
    this.getSubData(0)
  },
  methods: {
    getTopLists() {
      axios.post(url.topList).then((res) => {
        this.topLists = res.data.lists
      }).catch((error) => {
        console.log(error)
      })
    },
    getSubData(index,id) {
      this.topIndex = index
      if (index === 0) {
        this.getRankData()
      } else {
        axios.post(url.subList, {
          id
        }).then((res) => {
          this.subData = res.data.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    getRankData() {
      axios.post(url.rank).then((res) => {
        this.rankData = res.data.data
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  filters: {
    twoDecimal(price) {
      return price.toFixed(2)
    }
  }
})
