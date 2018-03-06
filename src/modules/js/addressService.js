import url from 'js/api.js'
import fetch from 'js/fetch.js'

class Address {
    static getList() {
        return fetch(url.addressList)
    }
    static add(data) {
        return fetch(url.addressAdd,data)
    }
    static remove(id) {
        return fetch(url.addressRemove,id)
    }
    static update(id) {
        return fetch(url.addressUpdate,id)
    }
    static setDefault(id) {
        return fetch(url.addressDefault,id)
    }
}

export default Address