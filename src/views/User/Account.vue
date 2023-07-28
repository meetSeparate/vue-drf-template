<script setup>
import {ref, onMounted} from "vue";
import {Search, Refresh, Edit, Delete, InfoFilled} from "@element-plus/icons-vue";
import {useGetUserInfo, useAddUserInfo} from "@/views/User/composable/hooks.js";
import {useGetCharacter} from "@/views/Permission/composable/hooks.js";

const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 获取用户信息
const {userData, getUserAccount} = useGetUserInfo()
// 新增用户
const {
  addUserFormVisible,
  addUserForm,
  title,
  userRules,
  addUserInfo,
  editUserInfoFlag,
  addUserInfoFlag,
  handlerClose,
  deleteUserInfo
} = useAddUserInfo()
// 获取角色信息
const {getCharacterData, allCharacterData} = useGetCharacter()

// 获取form表单ref
const userFormRef = ref()

// 分页操作
// 分页配置
const accountConfig = ref({
  username: '',
  currentPage: 1,
  pageSize: 7,
  total: 7,
})
// 改变分页Size
const handleSizeChange = (val) => {
  accountConfig.value.pageSize = val
  getUserAccount(accountConfig.value)
}
// 改变分页Page
const handleCurrentChange = (val) => {
  accountConfig.value.currentPage = val
  getUserAccount(accountConfig.value)
}

// 重置搜索
const resetSearch = () => {
  accountConfig.value.username = ''
  getUserAccount(accountConfig.value)
}

onMounted(() => {
  getUserAccount(accountConfig.value)
  getCharacterData({currentSize: 7, currentPage: 1})
})
</script>

<template>
  <div style="padding: 20px">
    <el-card style="height: 75px">
      <el-form :inline="true" class="account_form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" size="small" v-model="accountConfig.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" :icon="Search" @click="getUserAccount(accountConfig)">搜索</el-button>
          <el-button size="small" :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <div class="button">
        <el-button type="primary" size="small" @click="addUserInfoFlag">
          添加用户
          <el-icon class="el-icon--right">
            <Plus/>
          </el-icon>
        </el-button>
        <el-button type="danger" size="small">
          批量删除
          <el-icon class="el-icon--right">
            <Delete/>
          </el-icon>
        </el-button>
      </div>

      <el-scrollbar max-height="550px">
        <el-table
            :data="userData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" align="center"/>
          <el-table-column prop="username" label="用户名" align="center"/>
          <el-table-column prop="name" label="姓名" align="center"/>
          <el-table-column prop="gender" label="性别" align="center"/>
          <el-table-column prop="age" label="年龄" align="center"/>
          <el-table-column prop="phone" label="联系方式" align="center"/>
          <el-table-column prop="date_joined" label="注册时间" align="center"/>
          <el-table-column prop="role" label="用户角色" align="center"/>
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <el-button type="primary" :icon="Edit" size="small" @click="editUserInfoFlag(scope.row)"/>
              <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="你确定删除吗?"
                  @confirm="deleteUserInfo(scope.row.id, accountConfig, getUserAccount)"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" size="small" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <el-pagination
          class="pager"
          v-model:current-page="accountConfig.currentPage"
          v-model:page-size="accountConfig.pageSize"
          :page-sizes="[5, 7, 9, 11]"
          :small="true"
          :background="true"
          layout="prev, pager, next, jumper, total, sizes"
          :total="accountConfig.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog
        v-model="addUserFormVisible"
        :title="title"
        :before-close="handlerClose"
    >
      <el-form
          ref="userFormRef"
          :model="addUserForm"
          label-position="top"
          :rules="userRules"
          status-icon>
        <el-form-item
            label="用户名"
            prop="username"
        >
          <el-input v-model="addUserForm.username" autocomplete="off" placeholder="用户名"/>
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password"
            v-if="title==='新增用户'"
        >
          <el-input v-model="addUserForm.password" autocomplete="off" placeholder="密码"/>
        </el-form-item>
        <el-form-item
            label="姓名"
            prop="name"
        >
          <el-input v-model="addUserForm.name" autocomplete="off" placeholder="姓名"/>
        </el-form-item>
        <el-form-item
            label="性别"
            prop="gender"
        >
          <el-input v-model="addUserForm.gender" autocomplete="off" placeholder="性别"/>
        </el-form-item>
        <el-form-item
            label="年龄"
            prop="age"
        >
          <el-input v-model.number="addUserForm.age" autocomplete="off" placeholder="年龄"/>
        </el-form-item>
        <el-form-item
            label="联系方式"
            prop="phone"
        >
          <el-input v-model="addUserForm.phone" autocomplete="off" placeholder="联系方式"/>
        </el-form-item>
        <el-form-item
            label="角色"
            prop="role"
        >
          <el-select v-model="addUserForm.role" clearable placeholder="请选择">
            <el-option
                v-for="item in allCharacterData"
                :key="item.value"
                :label="item.label"
                :value="item.label"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handlerClose">取消</el-button>
        <el-button type="primary" @click="addUserInfo(accountConfig, getUserAccount, userFormRef)">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">
.account_form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding-bottom: 10px;
}

.pager {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>