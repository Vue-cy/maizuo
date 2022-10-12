<template>
  <div>
    <film-swiper :key="datalist.length">
      <swiper-item v-for="data in datalist" :key="data.id" class="s1">
        <img :src="data.imgUrl" alt="">
      </swiper-item>
    </film-swiper>

    <film-div class="sticky"></film-div>
    <router-view></router-view>
  </div>
</template>
<script>
  import filmSwiper from '@/mycompoents/filmswiper'
  import swiperItem from '@/mycompoents/swiperitem'
  import axios from 'axios'
  import filmDiv from '@/mycompoents/filmdiv'

  export default {
    data() {
      return {
        datalist: []
      }
    },
    mounted() {
      axios.get('/banner.json').then(res => {
        this.datalist = res.data.banner
      })
    },

    components: {
      filmSwiper,
      swiperItem,
      filmDiv
    }
  }
</script>
<style lang="scss" scoped>
  .cycy {
    font-size: 30px;
    color: red;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .sticky {
    z-index: 100;
    top: 0;
    background: white;
    position: sticky;
  }
</style>