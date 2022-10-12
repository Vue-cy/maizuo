<template>
  <div class="swiper-container" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default {
  props: {
    perview: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'swiper'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.perview,
      spaceBetween: 20,
      freeMode: true
    })
  }
}
</script>
<style lang="scss" scoped>
//.swiper-container{
//  position: absolute;
//  width: 18.75rem;
//  height: 8rem;
//}
</style>
