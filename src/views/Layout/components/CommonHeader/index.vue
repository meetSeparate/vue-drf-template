<script setup>
import HeaderTop from "./components/HeaderTop.vue";
import HeaderEnd from "./components/HeaderEnd.vue";
import {useCollapseStore} from "@/store/moudles/settings.js";

const collapseStore = useCollapseStore()
</script>

<template>
  <el-header class="common-header" :style="`width: calc(100% - ${collapseStore.isCollapse ? 60 : 210}px)`">
    <header-top />
    <header-end />
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
  transition: all .5s;
}

.dark {

  .el-header {
    background-color: #1d1e1f;
  }
}

@media screen and (max-width: 700px){
  .common-header {
    width: calc(100% - 50px) !important;
  }
}
</style>