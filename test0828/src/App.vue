<template>
  <div>
    <div class="aa"></div>
    <Tabbar v-show="$store.state.isTabarShow"></Tabbar>
    <router-view class="aa"></router-view>
  </div>
</template>
<script>
import Tabbar from "@/mycompoents/tabbar";
import Vant from "vant";
import "vant/lib/index.css";
import Vue from "vue";
Vue.use(Vant);
export default {
  data() {
    return {};
  },
  // mounted () {
  //   fetch('/kerwin/ajax/movieOnInfoList?token=&optimus_uuid=74B5F0A032A711EB82DD6B9282E93C676D27D7B9731D4E608D7612C3E708C120&optimus_risk_level=71&optimus_code=10')
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //     })
  // },
  components: {
    Tabbar,
  },
  methods: {},
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}
</style>
