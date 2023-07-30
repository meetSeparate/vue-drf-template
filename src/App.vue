<script setup>
import {onMounted, ref} from "vue";
import {useRouterTemplate} from "@/utils/router-template.js";
const {addAsyncRoute} = useRouterTemplate()
const asyncRoute = ref(JSON.parse(localStorage.getItem('primitiveRoute')) || [])

onMounted(() => {
  addAsyncRoute(asyncRoute.value)
})
</script>

<template>
  <router-view/>
</template>

<style scoped lang="scss">

</style>
