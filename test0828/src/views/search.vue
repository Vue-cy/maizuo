<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />

    <div v-if="value">
      <ul>
        <li class="content" v-for="(data, index) in computedData" :key="index">
          <p>
            <span class="cityname">{{ data.name }}</span
            ><span style="color: #ff611e" class="money"
              >￥{{ data.lowPrice / 100 }}起</span
            >
          </p>
          <p class="grey">
            <span class="address">{{ data.address }}</span
            ><span>{{ data.Distance | distance }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import obj from "@/util/mixinObj";
export default {
  mixins: [obj],
  data() {
    return {
      value: "",
    };
  },
  computed: {
    computedData() {
      return this.$store.state.citylist.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
  methods: {
    onSearch(val) {},
    onCancel() {
      this.$router.back();
    },
  },
  mounted() {
    const x = "你好";
    console.log(x.toUpperCase());
    if (this.$store.state.citylist.length === 0) {
      this.$store.dispatch("getCinemadata", this.$store.state.cityid);
    } else {
      console.log("111");
    }
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
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
