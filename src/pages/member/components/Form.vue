<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" value="" maxlength="20" v-model="name">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" value="" maxlength="11" v-model="tel">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="list.value" v-for="list in provinceData" :key="list.value">{{list.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="list.value" v-for="list in cityData" :key="list.value">{{list.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="list.value" v-for="list in districtData" :key="list.value">{{list.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" value="" maxlength="100" v-model="address">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center" @click="add">保存</div>
    </div>
    <div class="block section js-delete  block-control-btn" v-if="type === 'edit'">
      <div class="block-item c-red center" @click="remove(instance.id)">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-if="type === 'edit'">
      <button class="btn btn-standard js-save-default-btn" @click="setDefault(instance.id)">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
  import addressData from '../address.json'
  import Address from 'js/addressService.js'
  export default {
    name: 'Form',
    data() {
      return {
        provinceData: addressData.list,
        provinceValue: -1,
        cityValue: -1,
        districtValue: -1,
        cityData: null,
        districtData: null,
        type: this.$route.query.type,
        instance: this.$route.query.instance,
        name: '',
        tel: '',
        address: '',
        isFirst: true,
        id: '',
        isDefault: false,
        provinceName: '',
        cityName: '',
        districtName: ''
      }
    },
    computed: {
      addressLists() {
        return JSON.parse(JSON.stringify(this.$store.state.addressLists))
      }
    },
    created() {
      if (this.type === 'edit') {
        this.provinceValue = parseInt(this.instance.provinceValue)
        this.cityValue = parseInt(this.instance.cityValue)
        this.districtValue = parseInt(this.instance.districtValue)
        this.name = this.instance.name
        this.tel = this.instance.tel
        this.address = this.instance.address
        this.id = this.instance.id
        this.isDefault = this.instance.isDefault
        this.provinceName = this.instance.provinceName
        this.cityName = this.instance.cityName
        this.districtName = this.instance.districtName
      } else {
        this.id = Math.floor((Math.random()) * 100000) //新增状态给一个随机id
      }
    },
    methods: {
      setAddressName(data, addressName, val) { //封装函数，增加地址时地区的设置
        data.forEach((item) => {
          if (item.value === val) {
            this[addressName] = item.label
          }
        })
      },
      add() {
        let {
          name,
          address,
          provinceValue,
          cityValue,
          districtValue,
          tel,
          id,
          isDefault,
          provinceName,
          cityName,
          districtName
        } = this
        let data = {
          name,
          address,
          provinceValue,
          cityValue,
          districtValue,
          tel,
          id,
          isDefault,
          provinceName,
          cityName,
          districtName
        }
        if (this.type === 'edit') { //要判断一下是编辑状态还是新增状态，做出对应的请求
          let id = data.id
          this.$store.dispatch('updateAction', {
            data,
            id
          })
        } else {
          this.$store.dispatch('addAction', data)
        }
      },
      setDefault(id) {
        this.$store.dispatch('setDefaultAction', id)
      },
      remove(id) {
        if (window.confirm('确认要删除此地址？')) {
          this.$store.dispatch('removeAction', id)
        }
      }
    },
    watch: {
      provinceValue(val) {
        if (parseInt(val) === -1) {
          this.provinceValue = -1
          this.cityValue = -1
          this.districtValue = -1
          return
        }
        let index = this.provinceData.findIndex(item => {
          return item.value === parseInt(val)
        })
        this.cityData = this.provinceData[index].children
        if (!this.isFirst) { // 判断是不是第一次进入form页面
          this.cityValue = -1
          this.districtValue = -1
        }
        this.setAddressName(this.provinceData, 'provinceName', val)
        this.isFirst = false
      },
      cityValue(val) {
        if (parseInt(val) === -1) {
          this.cityValue = -1
          this.districtValue = -1
          return
        }
        let index = this.cityData.findIndex(item => {
          return item.value === val
        })
        this.setAddressName(this.cityData, 'cityName', val)
        this.districtData = this.cityData[index].children
        this.districtValue = -1
      },
      districtValue(val) {
        this.setAddressName(this.districtData, 'districtName', val)
      }
    },
  }
</script>
<style scoped>
  @import url('./address_base.css');
  @import url('./address.css');
</style>
