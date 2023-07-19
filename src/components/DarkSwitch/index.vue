<script setup>
import {ref, nextTick, onBeforeMount} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()

// 暗黑模式标志
const isDark = ref(false)

// 获取html标签
const html = document.documentElement

// 切换暗黑模式
const changeDark = () => {
  isDark.value ? html.className = 'dark' : html.className = ''
}

onBeforeMount(() => {
  if (html.className.indexOf('dark') !== -1) {
      isDark.value = true
  }
})

</script>

<template>
  <div class="switch">
    <el-switch
        v-model="isDark"
        style="--el-switch-on-color: #409eff;"
        class="mt-2"
        inline-prompt
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="changeDark"
    />
  </div>
</template>
