<script setup>
import CommonAside from './components/CommonAside/index.vue'
import CommonHeader from './components/CommonHeader/index.vue'
import CommonView from './components/CommonView/index.vue'

</script>

<template>
  <el-container>
    <common-aside/>
    <el-container class="common-container">
      <common-header/>
      <el-main>
        <common-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">

.common-container {
  display: flex;
  flex-direction: column;
}

.el-main {
  background-color: #f0f2f5;
  padding: 85px 0 0 0;
}

.dark {

  .el-main {
    background-color: #1d1e1f;
    padding: 85px 0 0 0;
  }

}

</style>