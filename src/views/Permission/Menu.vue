<script setup>
import {ref, onMounted} from 'vue'
import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {getMenu, addMenu} from "@/api/menu.js";

// 树形控件数据
const dataSource = ref([])

// 获取所有菜单及按钮权限
const getMenuData = async () => {
  const res = await getMenu()
  dataSource.value = res.data
}
// 新增菜单标志
const menuFormVisible = ref(false)
// 新增菜单表单
const menuForm = ref({
  label: '',
  another_name: '',
  type: '',
  reveal: '',
  path: '',
  redirect: '',
  menu_name: '',
  component_address: '',
  menu_icon: '',
  status: '',
  parent_menu: '',
})
// 新增表单验证
const menuRules = ref({
  label: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
  type: [{required: true, message: '请选择菜单类型', trigger: 'blur'}],
  parent_menu: [{required: true, message: '请选择父级菜单', trigger: 'blur'}],
})
// 新增菜单
const addMenuData = async () => {
  await addMenu(menuForm.value)
  ElMessage({
    type: 'success',
    message: '新增成功！',
    customClass: 'pure-message',
  })
  handlerClose()
  getMenuData()
}
const menuRef = ref()
// 关闭对话框回调
const handlerClose = () => {
  menuRef.value.resetFields()
  menuFormVisible.value = false
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
        :expand-on-click-node="false"
    >
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="success" size="small" :icon="Plus" circle plain @click="menuFormVisible=true"/>
            <el-button type="primary" v-if="node.label !== '根节点'" size="small" :icon="Edit" circle plain/>
            <el-button type="danger" v-if="node.label !== '根节点'" size="small" :icon="Delete" circle plain/>
          </span>
        </span>
      </template>
    </el-tree>

    <el-dialog v-model="menuFormVisible" title="新增菜单" :before-close="handlerClose">
      <el-form :model="menuForm" label-position="top" ref="menuRef" :rules="menuRules">
        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="menuForm.label" autocomplete="off" placeholder="菜单名称"/>
        </el-form-item>
        <el-form-item label="菜单别名" prop="another_name">
          <el-input v-model="menuForm.another_name" autocomplete="off" placeholder="菜单别名"/>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select v-model="menuForm.type" class="m-2" placeholder="菜单类型">
            <el-option
                v-for="item in [
                  {value: '目录', label: '目录'},
                  {value: '菜单', label: '菜单'},
                  {value: '按钮', label: '按钮'},]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" prop="reveal">
          <el-select v-model="menuForm.reveal" class="m-2" placeholder="是否显示">
            <el-option
                v-for="item in [
                  {value: '是', label: '是'},
                  {value: '否', label: '否'}
                  ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="路由URL" v-show="menuForm.type==='菜单' || menuForm.type==='目录'" prop="path">
          <el-input v-model="menuForm.path" autocomplete="off" placeholder="路由URL"/>
        </el-form-item>
        <el-form-item label="路由Name" v-show="menuForm.type==='菜单' || menuForm.type==='目录'" prop="menu_name">
          <el-input v-model="menuForm.menu_name" autocomplete="off" placeholder="路由Name"/>
        </el-form-item>
        <el-form-item label="组件地址" v-show="menuForm.type==='菜单' || menuForm.type==='目录'" prop="component_address">
          <el-input v-model="menuForm.component_address" autocomplete="off" placeholder="组件地址"/>
        </el-form-item>
        <el-form-item label="目录重定向" v-show="menuForm.type==='菜单' || menuForm.type==='目录'" prop="redirect" >
          <el-input v-model="menuForm.redirect" autocomplete="off" placeholder="组件地址"/>
        </el-form-item>
        <el-form-item label="菜单Icon" prop="menu_icon">
          <el-input v-model="menuForm.menu_icon" autocomplete="off" placeholder="菜单Icon"/>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-select v-model="menuForm.status" class="m-2" placeholder="菜单状态">
            <el-option
                v-for="item in [
                  {value: '正常', label: '正常'},
                  {value: '禁用', label: '禁用'}
                  ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parent_menu">
          <el-tree-select
              v-model="menuForm.parent_menu"
              :data="dataSource"
              check-strictly
              :render-after-expand="false"
              placeholder="父菜单"/>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handlerClose">取消</el-button>
        <el-button type="primary" @click="addMenuData">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
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
    margin-bottom: 10px !important;
  }

  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .el-button {
    width: 18px;
    height: 18px;
  }
}


.el-icon {
  width: 10px;
  height: 10px;
}
</style>