import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          cityid: state.cityid,
          cityname: state.cityname,
        };
      },
    }),
  ],

  state: {
    cityname: "广州",
    cityid: "440100",
    citylist: [],
    isTabarShow: true,
    color1: null,
    color2: null,
  },
  actions: {
    getCinemadata(store, cityid) {
      return http({
        url: `/gateway?cityId=${cityid}&ticketFlag=1&k=8826400`,
        headers: {
          "X-Host": " mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        console.log("2222");
        store.commit("changeCinemadata", res.data.data.cinemas);
      });
    },
  },
  getters: {},
  mutations: {
    handle(state, cityname) {
      state.cityname = cityname;
    },
    handleId(state, cityid) {
      state.cityid = cityid;
    },
    changeCinemadata(state, data) {
      state.citylist = data;
    },
    clearCinema(state) {
      state.citylist = [];
    },
    show(state) {
      state.isTabarShow = true;
    },
    hide(state) {
      state.isTabarShow = false;
    },
  },
  modules: {},
});
