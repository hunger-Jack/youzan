
/**
 * cart页面异步请求封装
 */
import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart {
    static getLists() {//获取购物车数据
        return fetch(url.cartList)
    }

    static add(id) {//增加商品数量
        return fetch(url.addCart,{
            id,
            number:1
        })
    }

    static reduce(id) {//减少商品数量
        return fetch(url.reduceCart,{
            id,
            number:1
        })
    }

    static removeCart(id) {//删除单个商品
        return fetch(url.removeCart,{
            id
        })
    }

    static mRemoveCart(arr) {//删除所选商品
        let ids = []
        arr.forEach(item => {
          ids.push(item.id)
        })
        return fetch(url.mRemoveCart,{
            ids
        })
    }
}

export default Cart