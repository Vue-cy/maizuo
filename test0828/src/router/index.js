import Vue from "vue";
import VueRouter from "vue-router";
import Coming from "@/views/films/coming";
import Playing from "@/views/films/playing";
import Detail from "@/views/detail";
import Center from "@/views/center";
import Cinemas from "@/views/cinemas";
import City from "@/views/City";
import Search from "@/views/search";

Vue.use(VueRouter); // 注册路由插件

const routes = [
  {
    path: "/films",
    component: () => import("@/views/films"),
    children: [
      {
        path: "/films/coming",
        component: Coming,
      },
      {
        path: "/films/playing",
        component: Playing,
      },
    ],
  },
  {
    name: "cycy",
    path: "/detail/:id",
    component: Detail,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/center",
    component: Center,
    meta: {
      iscy: true,
    },
  },
  {
    path: "/cinemas",
    component: Cinemas,
  },
  {
    path: "/city",
    component: City,
  },
  {
    path: "*",
    redirect: "/films/playing",
  },
];
const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.meta.iscy) {
//     next({
//       path: '/films',
//       query:{aa:to.fullPath}
//     })
//   }else{}
//   next()
// })
export default router;
