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

let {id} = qs.parse(location.search.substr(1))
let changeTabs = ['商品详情','本店成交']
new Vue({
    el: '#app',
    data () {
        return {
            details: null,
            changeTabs,
            curIndex: 0,
            dealLists: null
        }
    },
    methods: {
        getDetails() {
            axios.post(url.details,{id}).then((res) => {
                this.details = res.data.data
            })
        },
        changeTab(index) {
            this.curIndex = index
            if(this.curIndex === 1) {
                this.getDealLists()
            }
        },
        getDealLists() {
            axios.post(url.deal,{id}).then((res) => {
                this.dealLists = res.data.data.lists
            })
        }
    },
    created() {
        this.getDetails()
    },
    mixins: [mixin]
})