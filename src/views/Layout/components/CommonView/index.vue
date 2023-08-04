<script setup>
import {useSettingStore} from "@/store/moudles/settings.js";
import {ref, watch, nextTick} from "vue";

const settingStore = useSettingStore()

// 组件挂载与销毁标志
const flag = ref(true)

watch(() => settingStore.refresh, () => {
  flag.value = false

  nextTick(() => {
    flag.value = true
  })
})
</script>

<template>
  <el-scrollbar max-height="800px">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" v-if="flag"/>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>