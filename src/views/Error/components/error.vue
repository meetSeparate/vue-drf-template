<script setup>
defineProps({
  name: String,
  prompt: String,
})
</script>

<template>
  <div class="content">
    <svg-icon width="400px" height="300px" :name="name"/>

    <div class="prompt">
      <h1>{{name}}</h1>
      <p>{{prompt}}</p>
      <el-button type="primary" @click="$router.push({name: 'home'})">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .prompt{
    height: 200px;

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 14px;
      color: #999;
      margin: 15px 0;
    }
  }
}
</style>