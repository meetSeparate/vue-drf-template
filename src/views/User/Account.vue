<script setup>
import {ref, onMounted, computed} from "vue";
import {Search, Refresh, Edit, Delete, InfoFilled, Message} from "@element-plus/icons-vue";
import {useGetUserInfo, useAddUserInfo} from "@/views/User/composable/hooks.js";
import {useGetCharacter} from "@/views/Permission/composable/hooks.js";
import {multiDeleteUserApi} from "@/api/multi.js";
import {sendNoticeApi} from "@/api/notice.js";
import {ElMessage} from "element-plus";
import {ElLoading} from "element-plus";

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
// 表格选中id列表
const multipleSelection = ref([])
// 改变选中id
const handleSelectionChange = (val) => {
  multipleSelection.value = val.map(item => item.id)
}
// 批量删除
const multiDelete = () => {
  ElMessageBox.confirm(
      '确定要删除这些用户吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
    await multiDeleteUserApi(multipleSelection.value)
    ElMessage({
      type: 'success',
      message: '批量删除成功',
      customClass: 'pure-message'
    })
    getUserAccount(accountConfig.value)
  })
}
// 发送消息
const noticeVisible = ref(false)
const noticeRef = ref()
const noticeForm = ref({
  type: '',
  avatar: '',
  title: '',
  description: ''
})
// 计算属性传递参数
const noticeComputedData = computed(() => {
  return {
    type: noticeForm.value.type,
    avatar: noticeForm.value.avatar,
    title: noticeForm.value.title,
    description: noticeForm.value.description,
    multipleSelection: multipleSelection.value
  }
})
// 发送消息规则校验
const noticeRule = ref({
  type: [{required: true, message: '请选择消息类型', trigger: 'blur'}],
  title: [{required: true, message: '请选择消息类型', trigger: 'blur'}]
})
// 关闭前回调
const handleClose = () => {
  noticeVisible.value = false
  setTimeout(() => {
    noticeRef.value.resetFields()
  }, 200)
}
const sendMessage = async () => {
  if (!noticeRef.value) return
  await noticeRef.value.validate(async (valid) => {
    if (valid) {
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'error',
          message: '请至少选择一位用户',
          customClass: 'pure-message'
        })
        return
      }
      await sendNoticeApi(noticeComputedData.value)
      handleClose()
      ElMessage({
        type: 'success',
        message: '发送成功,请通知用户查看',
        customClass: 'pure-message'
      })
    }
  })
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
        <el-button type="danger" size="small" @click="multiDelete">
          批量删除
          <el-icon class="el-icon--right">
            <Delete/>
          </el-icon>
        </el-button>
        <el-button type="success" size="small" @click="noticeVisible=true">
          发送消息
          <el-icon class="el-icon--right">
            <Message />
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

    <el-dialog
      v-model="noticeVisible"
      title="发送消息"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="noticeForm" ref="noticeRef" :rules="noticeRule" label-position="top">
        <el-form-item label="消息类型" prop="type">
          <el-select v-model="noticeForm.type" placeholder="消息类型">
            <el-option
              v-for="item of [
                  {label: '通知', value: 1},
                  {label: '消息', value: 2},
                  {label: '待办', value: 3}
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消息标识" v-if="noticeForm.type===1 || noticeForm.type===2" prop="avatar">
          <el-select v-model="noticeForm.avatar" placeholder="消息标识">
            <el-option
              v-for="item of [
                  {
                    label: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                    value: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
                  },
                  {
                    label: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
                    value: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'
                  },
                  {
                    label: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
                    value: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png'
                  },
                  {
                    label: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
                    value: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png'
                  }
              ]"
              :label="item.label"
              :value="item.value"
            >
              <img style="width: 30px;height: 30px;border-radius: 50%" :src="item.label" alt="">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="noticeForm.title" placeholder="消息标题" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细描述" prop="description">
          <el-input v-model="noticeForm.description" type="textarea" row="4" placeholder="详细描述" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="sendMessage">
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