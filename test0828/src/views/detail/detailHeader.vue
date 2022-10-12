<template>
  <div class="head">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.head {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  height: 2.4rem;
  line-height: 2.4rem;
  width: 100%;
  i {
    position: fixed;
    left: 0.55rem;
    font-size: 1.5625rem;
  }
}
</style>
