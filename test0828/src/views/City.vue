<template>
  <div>
    <div style="background: red" v-for="item in datalist" :key="item.type">
      <div style="background: green">{{item.list | ss}}</div>
    </div>
    <van-index-bar :index-list="getType" @change="handleChange">
      <el-button type="text" @click="Oneback">取消</el-button>
      <div v-for="data in datalist" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell v-for="item in data.list" :title="item.name" :key="item.cityId" @click="getCity(item)" />
      </div>
    </van-index-bar>

  </div>
</template>
<script>
  import Vue from 'vue'
  import http from '@/util/http'
  import obj from '@/util/mixinObj'
  import { IndexBar, IndexAnchor, Toast } from 'vant'
  Vue.use(IndexBar)
  Vue.use(IndexAnchor)
  Vue.filter('ss', (qq) => {
    if (qq.isHot === 1) {
      return qq.name
    }
  })
  export default {
    mixins: [obj],
    data() {
      return {
        datalist: []
      }
    },
    computed: {
      getType() {
        return this.datalist.map(item => item.type)
      }
    },
    mounted() {
      http({
        url: 'gateway?k=6079683',
        headers: {
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
        this.datalist = this.renderCity(res.data.data.cities)
        // console.log(this.datalist)
      })
    },
    methods: {
      Oneback() {
        this.$router.back()
      },
      getCity(item) {
        this.$store.commit('clearCinema')
        this.$store.commit('handle', item.name)
        this.$store.commit('handleId', item.cityId)
        this.$router.back()
      },
      handleChange(data) {
        Toast(data)
      },
      renderCity(list) {
        const citylist = []
        const letterlist = []
        for (let i = 65; i < 91; i++) {
          letterlist.push(String.fromCharCode(i))
        }
        // console.log(letterlist)
        letterlist.forEach(letter => {
          const newlist = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
          // console.log(newlist)
          newlist.length > 0 && citylist.push({
            type: letter,
            list: newlist
          })
        })
        console.log(citylist)
        return citylist
      }
    }
  }
</script>
<style lang="scss" scoped>
  .van-toast--html,
  .van-toast--text {
    padding: 0.3125rem;
  }

  .el-button {
    z-index: 100;
    position: fixed;
    right: 0;
    top: 0;
    color: grey;
  }
</style>