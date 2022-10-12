<template>
  <div>
    <van-nav-bar
      title="影院"
      ref="navbar"
      @click-left="toCity"
      @click-right="toSearch"
    >
      <template #left> {{ cityname }} <van-icon name="arrow-down" /> </template>
      <template #right>
        <van-icon name="search" size="28" color="black" />
      </template>
    </van-nav-bar>

    <div class="box" :style="{ height: height }">
      <ul>
        <li class="content" v-for="(data, index) in citylist" :key="index">
          <p>
            <span class="cityname">{{ data.name }}</span
            ><span style="color: #ff611e" class="money"
              >￥{{ data.lowPrice / 100 }}起</span
            >
          </p>

          <p class="grey">
            <span class="address">{{ data.address }}</span
            ><span>距离未知</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
import { mapState } from "vuex";
export default {
  data() {
    return {
      datalist: [],
      height: "0px",
    };
  },
  computed: {
    ...mapState(["cityname", "citylist", "cityid"]),
  },
  methods: {
    toSearch() {
      this.$router.push("/search");
    },
    toCity() {
      // console.log('1111')
      this.$router.push("/city");
    },
  },
  mounted() {
    // console.log(this.$refs.navbar.$el.offsetHeight)
    this.height =
      document.documentElement.clientHeight -
      document.querySelector("footer").offsetHeight -
      this.$refs.navbar.$el.offsetHeight +
      "px";

    // 分发
    if (this.citylist.length === 0) {
      this.$store.dispatch("getCinemadata", this.cityid).then((res) => {
        // console.log('okok')
        this.$nextTick(() => {
          new BetterScroll(".box", {
            scrollbar: {
              fade: true,
            },
          });
        });
      });
    } else {
      this.$nextTick(() => {
        new BetterScroll(".box", {
          scrollbar: {
            fade: true,
          },
        });
      });
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityid}&ticketFlag=1&k=8826400`,
    //   headers: {
    //     'X-Host': ' mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   console.log(res.data)
    //   this.datalist = res.data.data.cinemas
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true
    //       }
    //     })
    //   })
    // })
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.box {
  position: relative;
  //height: calc(100vh-footer.offsetHeight);
  overflow: hidden;
}
.cityname {
  max-width: 14rem;
  //overflow: hidden;
}
.grey {
  font-size: 0.875rem;
  color: grey;
}
p {
  justify-content: space-between;
  display: flex;
}
.content {
  background: white;
  padding: 0.83rem;
}
.address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 1.125rem;
  width: 10.5rem;
}
</style>
