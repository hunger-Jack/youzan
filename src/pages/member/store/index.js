import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'
import router from '../router/index'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        addressLists: null
    },
    mutations: {
        getLists(state,res) {
            state.addressLists = res.data.lists
        },
        addList(state,data) {
            state.addressLists.push(data)
        }
    },
    actions: {
        getListsAction({commit}) {
            Address.getList().then(res=>{
                commit('getLists',res)
            })
        },
        addAction({commit},data) {
            Address.add(data).then(()=>{
                commit('addList',data)
            })
        }
    }
})

export default store
