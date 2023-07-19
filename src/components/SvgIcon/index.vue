<script setup>
defineProps({
  width: String,
  height: String,
  name: String
})
</script>

<template>
  <svg :style="{width, height}">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<style scoped>

</style>