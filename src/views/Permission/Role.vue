<script setup>
import {ref, onMounted, nextTick} from "vue";
import {Delete, Edit, InfoFilled, Plus, Search, Refresh, View} from "@element-plus/icons-vue";
import {useGetCharacter} from "@/views/Permission/composable/hooks.js";
import {useMenuStore} from "@/store/moudles/menu.js";
import {addCharacter, deleteCharacter, editCharacter} from "@/api/character.js";
import {ElMessage} from "element-plus";

// 菜单仓库
const menuStore = useMenuStore()
// 角色操作hooks
const {characterData, getCharacterData} = useGetCharacter()

// 分页操作
// 分页及搜索配置
const config = ref({
  searchInfo: '',
  currentPage: 1,
  currentSize: 7,
  total: 7
})
// 改变每页尺寸
const handleSizeChange = (number) => {
  config.value.currentSize = number
}
// 改变当前页码
const handleCurrentChange = (val) => {
  config.value.currentPage = val
}
// 搜索角色
const searchRole = () => {
  getCharacterData(config.value)
}
// 重置搜索
const resetSearch = () => {
  config.value.searchInfo = ''
  getCharacterData(config.value)
}
// 新增角色标志
const dialogRoleVisible = ref(false)
// 查看备注标志
const dialogNoteVisible = ref(false)
const roleRef = ref()
const treeRoleRef = ref()
const title = ref('新增角色')
// 新增角色表单
const roleForm = ref({
  id: '',
  title: '',
  note: '',
  permissions: [],
})
// 打开新增角色对话框
const openAddCharacter = () => {
  dialogRoleVisible.value = true
  title.value = '新增角色'
}
// 打开编辑角色对话框
const openEditCharacter = (row) => {
  title.value = '编辑角色'
  dialogRoleVisible.value = true
  nextTick(() => {
    roleForm.value.id = row.id
    roleForm.value.title = row.title
    roleForm.value.note = row.note
    treeRoleRef.value.setCheckedKeys(row.menu, false)
  })
}
// 关闭对话框回调
const handlerClose = () => {
  dialogRoleVisible.value = false
  roleRef.value.resetFields()
  // 清空树级选择框
  treeRoleRef.value.setCheckedKeys([], false)
}
// 新增或修改角色
const confirmRole = async () => {
  roleForm.value.permissions = treeRoleRef.value.getCheckedKeys(false)
  if (title.value === '新增角色') {
    await addCharacter(roleForm.value)
  } else {
    await editCharacter(roleForm.value)
  }
  ElMessage({
    type: 'success',
    message: '操作成功',
    customClass: 'pure-message'
  })
  handlerClose()
  getCharacterData(config.value)
}
// 删除角色
const deleteRole = async (row) => {
  await deleteCharacter(row.id)
  ElMessage({
    type: 'success',
    message: '删除成功',
    customClass: 'pure-message'
  })
  getCharacterData(config.value)
}
// 查看备注
const note = ref('')
const viewNote = (row) => {
  note.value = row.note
  dialogNoteVisible.value = true
}

onMounted(() => {
  getCharacterData(config.value)
  menuStore.getMenuData()
})
</script>

<template>
  <div class="container">

    <!-- 头部搜索栏 -->
    <el-card style="height: 75px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色名:">
          <el-input v-model="config.searchInfo" placeholder="角色名" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" :icon="Search" @click="searchRole">搜索</el-button>
          <el-button size="small" :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格信息 -->
    <el-card style="margin-top: 20px">
      <div class="operation">
        <el-button type="primary" size="small" :icon="Plus" @click="openAddCharacter">新增角色</el-button>
        <el-button type="danger" size="small" :icon="Delete">批量删除</el-button>
      </div>

      <div class="table">
        <el-table
            ref="multipleTableRef"
            :data="characterData"
            style="width: 100%"
        >
          <el-table-column fixed type="selection"/>
          <el-table-column property="id" label="Id" align="center"/>
          <el-table-column property="title" label="角色" show-overflow-tooltip align="center"/>
          <el-table-column property="create_date" label="创建时间" show-overflow-tooltip align="center"/>
          <el-table-column property="change_date" label="修改时间" show-overflow-tooltip align="center"/>
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="查看备注"
                  placement="top-end"
              >
                <el-button :icon="View" @click="viewNote(scope.row)" size="small"/>
              </el-tooltip>
              <el-button type="primary" :icon="Edit" @click="openEditCharacter(scope.row)" size="small"/>
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="你确定删除吗?"
                  @confirm="deleteRole(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" size="small"/>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination
            v-model:current-page="config.currentPage"
            v-model:page-size="config.currentSize"
            :page-sizes="[5, 7, 9, 11]"
            :small="true"
            :background="true"
            layout="prev, pager, next, jumper, total, sizes,"
            :total="config.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog v-model="dialogRoleVisible" :title="title" :before-close="handlerClose">
      <el-form :model="roleForm" ref="roleRef" label-position="top">
        <el-form-item
            label="角色名"
            prop="title"
            :rules="[{
                required: true,
                message: '请输入角色名',
                trigger: 'blur',
              }]
        ">
          <el-input v-model="roleForm.title" autocomplete="off" placeholder="角色名"/>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="roleForm.note" type="textarea" autocomplete="off" resize="none" placeholder="备注"/>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
              :data="menuStore.dataSource"
              :props="menuStore.defaultProps"
              node-key="value"
              show-checkbox
              ref="treeRoleRef"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handlerClose">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog
        v-model="dialogNoteVisible"
        title="备注"
        width="30%"
    >
      <span v-show="note">{{note}}</span>
      <el-empty v-show="!note" description="暂无备注" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
}

.demo-form-inline {
  display: flex;
  justify-content: space-between;

  .el-input {
    --el-input-width: 220px;
  }
}

.table {
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>