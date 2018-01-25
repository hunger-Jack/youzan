<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.image">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
    /*swiper是对dom操作的，但是dom什么时候生成呢？
      对父组件添加v-if进行判断，当bannerLists有数据时，才在页面渲染swipe组件
      在组件的mounted周期用swiper操作dom
    */
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'Swipe',
    props: ['lists'],//父组件通过props属性向Swipe组件传递数据

    mounted() {
       this.init()
    },
    methods: {
      init() {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        })
      }
    }
  }

</script>

<style>


</style>
