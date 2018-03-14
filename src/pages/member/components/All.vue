<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="addressLists && addressLists.length">
      <a class="block-item js-address-item address-item " @click="toEdit(index)" v-for="(list,index) in addressLists" :key="list.id"
        :class="{'address-item-default': list.isDefault}">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'All',
    computed: {
      addressLists() {
        return this.$store.state.addressLists
      }
    },
    methods: {
      toEdit(index) {
        this.$router.push({
          name: 'form',
          query: {
            type: 'edit',
            instance: this.addressLists[index]
          }
        })
      }
    },
    created() {
      if(!this.addressLists) {//只在第一次的时候获取数据
        this.$store.dispatch('getListsAction')
      }
      
    }
  }

</script>

<style scoped>
  @import url('./address_base.css');
  @import url('./address.css');

</style>
