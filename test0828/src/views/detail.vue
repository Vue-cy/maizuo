<template>
  <div v-if="filmInfo">
    <div class="space"></div>
    <detail-header v-scroll="50">
      <i class="iconfont icon-back" @click="back_one"></i>
      {{ filmInfo.name }}
    </detail-header>

    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="line-height: 0.9375rem"
          :class="isHidden ? 'hidden' : ''"
        >
          {{ filmInfo.synopsis }}
        </div>

        <div style="text-align: center">
          <i
            class="iconfont"
            @click="isHidden = !isHidden"
            :class="isHidden ? 'icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>
    </div>

    <!--人物    -->
    <div>
      <p class="title">人物</p>
      <detail-swiper :perview="3" name="actors" class="inner">
        <detail-swiper-item
          v-for="(data, index) in filmInfo.actors"
          :key="index"
        >
          <div
            :style="{ backgroundImage: 'url(' + data.avatarAddress + ')' }"
            class="ava"
            @click="handle_one(index)"
          ></div>
          <div style="text-align: center; font-size: 12px">
            {{ data.name }}
          </div>
          <div style="text-align: center; font-size: 13px">
            {{ data.role }}
          </div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
    <!-- 剧照 -->
    <div class="aa">
      <div class="title">剧照</div>
      <detail-swiper :perview="2" name="photos" class="inner">
        <detail-swiper-item
          v-for="(data, index) in filmInfo.photos"
          :key="index"
        >
          <div
            :style="{
              backgroundImage: 'url(' + data + ')',
            }"
            class="ava"
            @click="handle(index)"
          ></div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
  </div>
</template>
<script>
import http from "@/util/http";
import obj from "@/util/mixinObj";
import moment from "moment";
import Vue from "vue";
import detailHeader from "@/views/detail/detailHeader";
import detailSwiper from "@/views/detail/detailSwiper";
import detailSwiperItem from "@/views/detail/detailSwiperitem";
import { ImagePreview } from "vant";
moment.locale("zh-cn"); // 设置成中文
Vue.filter("dateFilter", (date) => {
  return moment(date * 1000).format("YYYY-MM-DD");
});

Vue.directive("scroll", {
  mounted(el, binding) {
    // console.log()
    el.style.display = "none";

    window.onscroll = () => {
      // console.log('scroll')
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  // 销毁执行的
  unbind() {
    window.onscroll = null;
  },
});

export default {
  mixins: [obj],
  data() {
    return {
      filmInfo: null,
      isHidden: true,
    };
  },
  methods: {
    back_one() {
      // window.history.back()
      this.$router.back();
    },
    handle(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-left",
      });
    },
    handle_one(index) {
      ImagePreview({
        images: this.filmInfo.actors.avatarAddress,
        startPosition: index,
      });
    },
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader,
  },
  created() {
    // 当前匹配的路由
    console.log("created", this.$route.params.id);

    // axios 利用 id 发请求到详情接口 ，获取详细数据 ，布局页面

    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=5501344`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      console.log(res.data.data.film);
      this.filmInfo = res.data.data.film;
    });
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
body {
  display: flex;
  flex-direction: column;
}
.poster {
  margin-top: 39px;
  width: 100%;
  height: 11.666667rem;
  background-position: center;
  background-size: cover;
}
.content {
  border-bottom: 0.3125rem grey solid;
  padding: 0.833333rem;
  .detail-text {
    color: #797d82;
    font-size: 0.8125rem;
    margin-top: 0.222222rem;
  }
}
.title {
  padding: 0.833333rem;
}
.hidden {
  overflow: hidden;
  height: 2.875rem;
}
.ava {
  width: 100%;
  height: 5rem;
  background-position: center;
  background-size: cover;
}
.inner {
  overflow: auto;
}
</style>
