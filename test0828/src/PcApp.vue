<template>
  <div>
    <el-button icon="el-icon-search" circle size="medium" :loading="true" style="height: 50px"></el-button>
    <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
    <el-button type="success" icon="el-icon-check" circle size="small"></el-button>
    <el-button type="info" icon="el-icon-message" circle style="height: 200px"></el-button>
    <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </div>
</template>
<script>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
Vue.use(ElementUI)
export default {}
</script>
