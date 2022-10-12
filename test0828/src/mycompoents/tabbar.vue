<template>
  <div class="qq">
    <footer>
      <ul>
        <router-link to="/films/playing" custom v-slot="{ navigate, isActive }">
          <li @click="navigate" :class="isActive ? 'cy' : ''">
            <i class="iconfont icon-dianying"></i>
            <span>电影</span>
          </li>
        </router-link>
        <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
          <li @click="navigate" :class="isActive ? 'cy' : ''">
            <i class="iconfont icon-biaozhun"></i>
            <span>cinemas</span>
          </li>
        </router-link>
        <router-link to="/center" custom v-slot="{ navigate, isActive }">
          <li @click="navigate" :class="isActive ? 'cy' : ''">
            <i class="iconfont icon-zhanghu"></i>
            <span>center</span>
          </li>
        </router-link>
      </ul>
    </footer>
  </div>
</template>
<script>
// import 'public/iconfont/iconfont.css'
</script>
<style lang="scss" scoped>
.cy {
  color: red;
}
footer {
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.7rem;
  z-index: 99;
  ul {
    display: flex;
    li {
      margin-top: 0.35rem;
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      align-items: center;
      i {
        font-size: 1rem;
        height: 1.25rem;
        line-height: 1.25rem;
      }
      span {
        height: 0.875rem;
        line-height: 0.875rem;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
