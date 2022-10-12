<template>
  <div>
    <ul>
      <router-link to="/films/coming" tag="li" active-class="cycy"><span>即将上映</span></router-link>
      <router-link to="/films/playing" tag="li" active-class="cycy"><span>正在热映</span></router-link>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.cycy{
  color: red;
  border-bottom: 2px red solid;
}
ul{
  display: flex;
  //position: sticky;
  li{
    flex: 1;
   text-align: center;
    border-bottom: 2px grey solid;
  }
}
</style>
