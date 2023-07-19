<script setup>
import {ref, onMounted} from 'vue'
import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {getMenu} from "@/api/menu.js";

const dataSource = ref([])

// 获取所有菜单及按钮权限
const getMenuData = async () =>{
  const res = await getMenu()
  dataSource.value = res.data
}

onMounted(() => {
  getMenuData()
})
</script>

<template>
<div class="padding">
  <el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="success" size="small" :icon="Plus" circle plain />
            <el-button type="primary" v-if="node.id !== 1" size="small" :icon="Edit" circle plain />
            <el-button type="danger" v-if="node.id !== 1" size="small" :icon="Delete" circle plain />
          </span>
        </span>
    </template>
  </el-tree>
</div>
</template>

<style scoped lang="scss">

.padding {
  padding: 20px;
}

.el-tree {
  padding: 10px;
  width: 600px;
  color: #333;

  .el-tree-node {
    margin-bottom:10px !important;
  }

  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

.el-button {
  width: 18px;
  height: 18px;
}

.el-icon {
  width: 10px;
  height: 10px;
}
</style>