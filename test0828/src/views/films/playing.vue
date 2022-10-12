<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="很高兴见到你" @load="onLoad" :immediate-check="false">
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <img :src="data.poster" />
        <div style="margin-left:80px">
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div :class="data.grade ? '' : 'hidden'">
              观众评分:<span style="color: red">{{ data.grade | gradeFilter}}</span>
            </div>

            <div class="actors">主演： {{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
  import http from '@/util/http'
  import Vue from 'vue'
  import { Toast } from 'vant'

  Vue.filter('gradeFilter', (item) => {
    if (item === undefined) return '暂无评分'
    return item
  })
  Vue.filter('actorsFilter', (data) => {
    // console.log()
    if (data === undefined) return '暂无主演'
    return data.map((item) => item.name).join(' ')
  })
  export default {
    data() {
      return {
        datalist: [],
        loading: false,
        finished: false,
        current: 1,
        total: 0
      }
    },

    mounted() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      http({
        url: `/gateway?cityId=${this.$store.state.cityid}&pageNum=1&pageSize=10&type=1&k=5196770`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.data.films)
        this.datalist = res.data.data.films

        this.total = res.data.data.total
        Toast.clear()
      })
    },

    methods: {
      onLoad() {
        // console.log('到底了')
        // 总长度 匹配 ，禁用懒加载
        if (this.datalist.length === this.total && this.total !== 0) {
          this.finished = true
          return
        }
        this.current++
        http({
          url: `gateway?cityId=440100&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
          headers: {
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then((res) => {
          // console.log(res.data.data.films)
          // this.datalist = [...this.datalist, ...res.data.data.films]
          this.datalist = this.datalist.concat(res.data.data.films)

          // loading主动设置成 false
          this.loading = false
        })
      },
      handleChangePage(id) {

        // 2-通过命名路由跳转
        this.$router.push({
          name: 'cycy',
          params: {
            id
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .van-list {
    .van-cell {
      overflow: hidden;
      padding: 0.833333rem;

      img {
        height: 100%;
        width: 4.3rem;
        float: left;
      }

      .title {
        font-size: 16px;
      }

      .content {
        font-size: 13px;
        color: gray;

        .actors {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 11.111111rem;
        }
      }
    }
  }
</style>