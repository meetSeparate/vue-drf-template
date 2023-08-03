<template>
  <div class="search-footer text-[#333] dark:text-white">
    <span class="search-footer-item">
      <svg-icon name="enter_outlined" width="20px" height="20px" class="icon"/>
      确认
    </span>
    <span class="search-footer-item">
      <el-icon class="icon"><Top /></el-icon>
      <el-icon class="icon"><Bottom /></el-icon>
      切换
    </span>
    <span class="search-footer-item">
      <svg-icon name="keyboard_esc" width="20px" height="20px" class="icon"/>
      关闭
    </span>
  </div>
</template>

<script setup>
import {Bottom, Top} from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.search-footer {
  display: flex;

  .search-footer-item {
    display: flex;
    align-items: center;
    margin-right: 14px;
  }

  .icon {
    width: 20px;
    height: 20px;
    padding: 2px;
    margin-right: 3px;
    font-size: 20px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
  }
}
</style>
