/**
 * Vue混合  官网地址 https://cn.vuejs.org/v2/guide/mixins.html
 * 可以把一些公用的options抽离出来
 */
import Foot from '@/components/Foot'
let mixin = {
  filters: {
    twoDecimal(price) {
      return price.toFixed(2)
    }
  },
  components: {
    Foot
  },
}

export default mixin