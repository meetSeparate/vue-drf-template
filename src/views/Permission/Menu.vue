<script setup>
import {ref, onMounted, nextTick} from 'vue'
import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {addMenu, editMenu, deleteMenu} from "@/api/menu.js";
import {useMenuStore} from "@/store/moudles/menu.js";

// 菜单仓库
const menuStore = useMenuStore()
// 新增或修改菜单标志
const menuFormVisible = ref(false)
// dialog标题
const title = ref('新增菜单')
// 打开新增菜单对话框
const openAddDialog = (data) => {
  title.value = '新增菜单'
  menuFormVisible.value = true
  nextTick(() => {
    menuForm.value.parent_menu_id = data.value
  })
}
// 打开编辑菜单对话框
const openEditDialog = (data) => {
  title.value = '修改菜单'
  menuFormVisible.value = true
  nextTick(() => {
    Object.assign(menuForm.value, data)
  })
}
// 新增菜单表单
const menuForm = ref({
  value: '',
  label: '',
  another_name: '',
  type: '',
  reveal: '',
  path: '',
  redirect: '',
  menu_name: '',
  component_address: '',
  sequence: '2',
  menu_icon: '',
  status: '',
  parent_menu_id: '',
})
// 新增表单验证
const menuRules = ref({
  label: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
  type: [{required: true, message: '请选择菜单类型', trigger: 'blur'}],
  parent_menu_id: [{required: true, message: '请选择父级菜单', trigger: 'blur'}],
})
const menuRef = ref()
// 新增或修改菜单
const addMenuData = async () => {
  if (!menuRef.value) return
  await menuRef.value.validate(async (valid) => {
    if (valid) {
      if (title.value === '新增菜单') {
        await addMenu(menuForm.value)
      } else {
        await editMenu(menuForm.value)
      }
      ElMessage({
        type: 'success',
        message: '操作成功！',
        customClass: 'pure-message',
      })
      handlerClose()
      menuStore.getMenuData()
    }
  })
}
// 删除菜单
const deleteMenuData = async (data) => {
  await deleteMenu(data)
  ElMessage({
    type: 'success',
    message: '删除成功！',
    customClass: 'pure-message',
  })
  menuStore.getMenuData()
}
// 关闭对话框回调
const handlerClose = () => {
  menuFormVisible.value = false
  menuRef.value.resetFields()
}
onMounted(() => {
  menuStore.getMenuData()
})
</script>

<template>
  <div class="padding">
    <el-card>
      <el-scrollbar max-height="550px">
        <el-table
            :data="menuStore.dataSource"
            style="width: 100%; margin-bottom: 20px"
            row-key="value"
            border
            default-expand-all
        >
          <el-table-column prop="label" label="菜单名称" width="150px"/>
          <el-table-column prop="another_name" label="菜单别名" width="100px" align="center"/>
          <el-table-column prop="type" label="菜单类型" width="120px" align="center"/>
          <el-table-column prop="reveal" label="是否显示" width="100px" align="center"/>
          <el-table-column prop="path" label="菜单URL" width="140px"/>
          <el-table-column prop="menu_name" label="菜单Name" width="100px" />
          <el-table-column prop="component_address" label="组件地址" width="160px" />
          <el-table-column prop="sequence" label="菜单顺序" width="80px" align="center"/>
          <el-table-column prop="redirect" label="重定向" width="150px"/>
          <el-table-column label="菜单Icon" width="80px" align="center">
            <template #default="scope">
              <div v-if="scope.row.menu_icon" style="display:flex;justify-content: center">
                <component :is="scope.row.menu_icon" style="width: 20px;height: 20px"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="菜单状态" width="100px" />
          <el-table-column prop="value" label="菜单id" width="80px" align="center"/>
          <el-table-column prop="parent_menu_id" label="父菜单" width="80px" align="center"/>
          <el-table-column fixed="right" label="操作" width="180px">
            <template #default="scope">
              <el-button
                  v-if="scope.row.type!=='按钮'"
                  type="success"
                  size="small"
                  :icon="Plus"
                  circle
                  @click="openAddDialog(scope.row)"
              />
              <el-button
                  v-if="scope.row.type!=='根节点'"
                  type="primary"
                  size="small"
                  @click="openEditDialog(scope.row)"
                  :icon="Edit"
                  circle
              />
              <el-popconfirm
                  v-if="scope.row.type!=='根节点'"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  icon-color="#626AEF"
                  title="确定删除吗?"
                  @confirm="deleteMenuData(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" size="small" :icon="Delete" circle/>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-card>
    <el-dialog v-model="menuFormVisible" :title="title" :before-close="handlerClose">
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
        <template v-if="menuForm.type==='菜单' || menuForm.type==='目录'">
          <el-form-item label="路由URL" prop="path">
            <el-input v-model="menuForm.path" autocomplete="off" placeholder="路由URL"/>
          </el-form-item>
          <el-form-item label="路由Name" prop="menu_name">
            <el-input v-model="menuForm.menu_name" autocomplete="off" placeholder="路由Name"/>
          </el-form-item>
          <el-form-item label="组件地址" prop="component_address">
            <el-input v-model="menuForm.component_address" autocomplete="off" placeholder="组件地址"/>
          </el-form-item>
          <el-form-item label="菜单顺序" prop="sequence">
            <el-input v-model="menuForm.sequence" autocomplete="off" placeholder="菜单顺序"/>
          </el-form-item>
          <el-form-item v-if="menuForm.type==='目录'" label="目录重定向" prop="redirect">
            <el-input v-model="menuForm.redirect" autocomplete="off" placeholder="组件地址"/>
          </el-form-item>
          <el-form-item label="菜单Icon" prop="menu_icon">
            <el-input v-model="menuForm.menu_icon" autocomplete="off" placeholder="菜单Icon"/>
          </el-form-item>
        </template>
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
        <el-form-item label="父级菜单" prop="parent_menu_id">
          <el-tree-select
              v-model="menuForm.parent_menu_id"
              :data="menuStore.dataSource"
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
.el-table {
  font-size: 13px;
}
.el-button {
  margin: 0 8px;
}
</style>