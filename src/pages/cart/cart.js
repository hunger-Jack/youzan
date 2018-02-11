import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

new Vue({
    el: '.container',
    data () {
        return {
            cartLists: null
        }
    },
    computed: {
        
    },
    methods: {
        getLists() {
            axios.post(url.cartList).then((res)=> {//由于vue响应式原理，在这里必须先初始化处理数据，后赋值。
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.goodsList.forEach(good => {
                        good.checked = true
                    })
                });
                this.cartLists = lists //这样的花就不要Object.assign()了
            })
        },
        selectGood(good) {
            good.checked = !good.checked
        }
    },
    created () {
        this.getLists()
    },
    mixins: [mixin]
    
})