<script setup>
import {onMounted, ref} from "vue";
import {useRouterTemplate} from "@/utils/router-template.js";
import {useSettingStore} from "@/store/moudles/settings.js";

const {addAsyncRoute} = useRouterTemplate()
const settingStore = useSettingStore()
const asyncRoute = ref(JSON.parse(localStorage.getItem('primitiveRoute')) || [])

onMounted(() => {
  addAsyncRoute(asyncRoute.value)
})
</script>

<template>
  <el-config-provider :locale="settingStore.locale">
    <router-view/>
  </el-config-provider>
</template>

<style scoped lang="scss">

</style>
