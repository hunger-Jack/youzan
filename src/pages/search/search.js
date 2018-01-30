import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keywords,id} = qs.parse(location.search.substr(1))
new Vue({
    el: '.container',
    data () {
        return {
            keywords,
            searchLists: null,
            isShow: false
        }
    },
    created () {
        this.getSearchLists()
    },
    methods: {
        getSearchLists() {
            axios.post(url.searchList,{keywords,id}).then((res) => {
                this.searchLists = res.data.lists
            })
        },
        move() {//使用一些dom的api来实现backTop是否显示问题
            if(document.documentElement.scrollTop > 100) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        backTop() {//使用了vue的一个js动画库Velocity-animate，做出返回顶部的动画效果
            Velocity(document.body,'scroll',{duration:1000})
            document.documentElement.scrollTop = 0
        }
    },
    mixins: [mixin]
})