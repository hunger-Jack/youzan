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
    goBack() {
      router.go(-1)
    },
    getLists(state, res) {
      state.addressLists = res.data.lists
    },
    addList(state, data) {
      state.addressLists.push(data)

    },
    updateList(state, {
      data,
      id
    }) {
      let index = state.addressLists.findIndex((item) => {
        return item.id === id
      })
      state.addressLists[index] = data

    },
    setDefault(state, id) {
      state.addressLists.forEach(item=>{
          item.isDefault = false
          if(item.id === id) {
              item.isDefault = true
          }
      })
    },
    removeList(state, id) {
      let index = state.addressLists.findIndex((item) => {
        return item.id === id
      })
      state.addressLists.splice(index, 1)

    }
  },
  actions: {
    getListsAction({
      commit
    }) {
      Address.getList().then(res => {
        commit('getLists', res)
      })
    },
    addAction({
      commit
    }, data) {
      Address.add(data).then(() => {
        commit('addList', data)
        commit('goBack')
      })
    },
    updateAction({
      commit
    }, {
      data,
      id
    }) {
      commit('updateList', {
        data,
        id
      })
      commit('goBack')
    },
    setDefaultAction({
      commit
    }, id) {
      Address.setDefault(id).then(() => {
        commit('setDefault', id)
        commit('goBack')
      })
    },
    removeAction({
      commit
    }, id) {
      Address.remove(id).then(() => {
        commit('removeList', id)
        commit('goBack')
      })
    }
  }
})

export default store
