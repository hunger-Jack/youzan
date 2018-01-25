import './category.css'
import 'css/common.css'
import Vue from 'vue'
import axios from 'axios'
import Foot from '@/components/Foot'
import url from 'js/api'
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
    this.getRankData()
  },
  methods: {
    getTopLists() {
      axios.post(url.topList).then((res) => {
        this.topLists = res.data.lists
      }).catch((error) => {
        console.log(error)
      })
    },
    getSubData(id, index) {
      this.topIndex = index
      axios.post(url.subList).then((res) => {
        this.subData = res.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    getRankData() {
      axios.post(url.rank).then((res) => {
        this.rankData = res.data.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
