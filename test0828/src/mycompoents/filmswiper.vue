<template>
  <div class="swiper">
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
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    new Swiper('.swiper', {
      // direction:'vertical',
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.swiper{
  height: 10.5rem;
}

</style>
