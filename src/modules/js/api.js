let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    searchList: '/search/list',
    details: '/goods/details',
    deal: '/goods/deal',
    addCart: '/cart/add',
    cartList: '/cart/list',
    updateCart: '/cart/update',
    reduceCart: '/cart/reduce',
    removeCart: '/cart/remove',
    mRemoveCart: '/cart/mremove',
    addressList: '/address/list',
    addressRemove: '/address/remove',
    addressAdd: '/address/add',
    addressUpdate: '/address/update',
    addressDefault: '/address/setDefault'
}

let host = 'http://rapapi.org/mockjsdata/24170'

for(let key in url) {
    if(url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url