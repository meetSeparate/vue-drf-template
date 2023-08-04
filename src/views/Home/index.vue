<script setup>
import {ref} from 'vue'
import Personal from "@/views/Home/components/Personal.vue";
import Announcement from "@/views/Home/components/Announcement.vue";
import CompositeIndex from "@/views/Home/components/CompositeIndex.vue";
import BrowserRatioChart from "@/views/Home/components/BrowserRatioChart.vue";
import GithubClockInChart from "@/views/Home/components/GithubClockInChart.vue";

// 骨架加载屏
const loading = ref(true)
setTimeout(() => {
  loading.value = !loading.value;
}, 800);

</script>

<template>
  <el-scrollbar max-height="800px">
    <el-card class="label" v-if="$route.name === 'home'">
      <div class="left-mark">
        <el-avatar
            :size="50"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />

        <span class="type-it0">时光不老，我们不散😃！</span>
      </div>
    </el-card>
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12">
        <personal :loading="loading" />
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12">
        <announcement :loading="loading" />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8">
        <composite-index />
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8">
        <browser-ratio-chart />
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8">
        <github-clock-in-chart />
      </el-col>
    </el-row>
  </el-scrollbar>

</template>

<style scoped lang="scss">

.label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  .el-avatar {
    cursor: pointer;
    margin-right: 10px;
  }

  .left-mark {
    display: flex;
    align-items: center;
  }

  :deep(.el-card__body) {
    padding: 0;
  }

}

.el-row {
  margin: 20px;

  .el-col {
    padding: 0 12px;
    margin-bottom: 10px;
  }
}

</style>