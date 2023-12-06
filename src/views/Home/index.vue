<script setup>
import {ref} from 'vue'
import Personal from "./components/Personal.vue"
import Announcement from "./components/Announcement.vue"
import CompositeIndex from "./components/CompositeIndex.vue"
import BrowserRatioChart from "./components/BrowserRatioChart.vue"
import GithubClockInChart from "./components/GithubClockInChart.vue"
import TypeIt from "@/components/ReTypeit/index.js"
import Motion from '@/components/Motion/index.js'

// 骨架加载屏
const loading = ref(true)
setTimeout(() => {
  loading.value = !loading.value
}, 800)
</script>

<template>
  <el-scrollbar max-height="1000px">
    <el-card class="label" v-if="$route.name === 'home'">
      <div class="left-mark">
        <el-avatar
            :size="50"
            class="mr-3"
            src="src/assets/images/avatar.jpg"
        />

        <TypeIt
            :className="'type-it0'"
            :values="['图像修复系统简介']"
            :cursor="false"
            :speed="60"
        />
      </div>
    </el-card>
    <el-row>
        <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
        >
          <personal :loading="loading" />
        </el-col>
        <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
        >
          <announcement :loading="loading" />
        </el-col>
    </el-row>
    <el-row>
        <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
        >
          <Motion :delay="100">
            <el-card>
            <template #header>
              <TypeIt
                  :className="'type-it3'"
                  :values="['2023年上证指数']"
                  :cursor="false"
                  :speed="120"
              />
            </template>
            <el-skeleton :rows="7" animated :loading="loading">
              <composite-index />
            </el-skeleton>
          </el-card>
          </Motion>
        </el-col>
        <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
        >
          <Motion :delay="100">
            <el-card>
            <template #header>
              <TypeIt
                  :className="'type-it4'"
                  :values="['浏览器占比变化']"
                  :cursor="false"
                  :speed="120"
              />
            </template>
            <el-skeleton :rows="7" animated :loading="loading">
              <browser-ratio-chart />
            </el-skeleton>
          </el-card>
          </Motion>
        </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
      >
        <Motion :delay="100">
          <el-card>
          <template #header>
            <TypeIt
                :className="'type-it5'"
                :values="['Github打卡数据']"
                :cursor="false"
                :speed="120"
            />
          </template>
          <el-skeleton :rows="7" animated :loading="loading">
            <github-clock-in-chart />
          </el-skeleton>
        </el-card>
        </Motion>
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