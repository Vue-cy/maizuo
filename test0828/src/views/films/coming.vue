<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="很高兴见到你"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" />
        <div class="small">
          <div class="title">{{ data.name }}  <span class="preserve">{{data.filmType.name}}</span>  </div>
          <div class="content">
            <div class="actors">主演： {{ data.actors | actorsFilter }}</div>
            <div>上映日期:{{ data.premiereAt | dateFilter}} </div>
          </div>
        </div>
        <button class="btn">预购</button>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { Toast } from 'vant'
import moment from 'moment'
Vue.use(Toast)

Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('dddd MMM Do  ')
})
Vue.filter('actorsFilter', (data) => {
  // console.log()
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },

  mounted () {
    http({
      url: 'gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=4033577',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },

  methods: {
    onLoad () {
      // console.log('到底了')
      // 总长度 匹配 ，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      Toast.clear()
      this.current++
      http({
        url: `gateway?cityId=${this.$store.state.cityid}&pageNum=${this.current}&pageSize=10&type=2&k=4033577`,
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
    handleChangePage (id) {
      //   console.log(id)
      // 编程式导航
      //   location.href = '#/detail'

      // /detail/1111
      // 1-通过路径跳转
      // this.$router.push(`/detail/${id}`)

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
.btn{
  position: absolute;
  border: 0.0625rem solid #ffb232;
  border-radius: 0.25rem;
  right: 0.325rem;
  top: 40%;
  background: white;
  padding: 0.3125rem;
}
.preserve{
  background: grey;
  color: white;
  border-radius: 15%;
}

.van-list {
  .van-cell {
    overflow: hidden;
    padding: 0.833333rem;

    img {
      height: 100%;
      width: 4.2rem;
      float: left;
    }

    .small {
      position: relative;
      padding-left: 5.1875rem;

      .title {
        font-size: 16px;
        margin-top: 1rem;
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
}
.hidden {
  visibility: hidden;
}
</style>
