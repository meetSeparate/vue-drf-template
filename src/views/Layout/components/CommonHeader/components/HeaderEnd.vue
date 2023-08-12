<script setup>
import {RefreshRight, FullScreen} from "@element-plus/icons-vue";
import {useSettingStore} from "@/store/moudles/settings.js";
import HeaderTab from "@/views/Layout/components/CommonHeader/components/HeaderTab.vue";
import {ref} from "vue";

const settingStore = useSettingStore()

// 页面是否全屏标志
const screenFlag = ref(false)

// 切换全屏状态
const changeFullScreen = () => {
  if (!screenFlag.value) {
    document.documentElement.requestFullscreen()
    screenFlag.value = true
  } else {
    document.exitFullscreen()
    screenFlag.value = false
  }
}
</script>

<template>
  <div class="header-end">
    <div class="navigation-card" id="tags-view">
      <header-tab />
    </div>

    <div class="settings">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
                :icon="RefreshRight"
                @click="settingStore.changeRefresh"
            >重新加载</el-dropdown-item>
            <el-dropdown-item
                :icon="FullScreen"
                @click="changeFullScreen"
            >{{screenFlag ? '退出全屏' : '页面全屏'}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-end {
  width: 100%;
  font-size: 14px;
  display: flex;
  background-color: #fff;
  align-items: center;
  color: var(--el-text-color-primary);
  position: relative;
  box-shadow: 0 0 1px #888;
  padding: 0 20px 0 5px;

  .navigation-card {
    flex: 1;
    overflow: hidden;
    padding: 5px 2px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition: all 1s;
  }

  .settings {
    display: flex;
    align-items: center;
    height: 100%;


    .el-icon {
      width: 20px;
      height: 20px;

    }
  }
}

.dark {
  .header-end {
    background-color: #1d1e1f;
  }
}
</style>