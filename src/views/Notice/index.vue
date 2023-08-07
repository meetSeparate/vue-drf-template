<script setup>
import {ref, onMounted} from 'vue'
import {getAllNoticeApi, deleteNoticeApi} from "@/api/notice.js";
import {multiDeleteNoticeApi} from "@/api/multi.js";
import moment from "moment";
import {Delete, InfoFilled, Refresh, Search} from "@element-plus/icons-vue";

// 消息数据
const noticeData = ref([])
// 分页操作
// 分页配置
const noticeConfig = ref({
  title: '',
  currentPage: 1,
  pageSize: 7,
  total: 7,
})
// 改变分页Size
const handleSizeChange = (val) => {
  noticeConfig.value.pageSize = val
  getNoticeData(noticeConfig.value)
}
// 改变分页Page
const handleCurrentChange = (val) => {
  noticeConfig.value.currentPage = val
  getNoticeData(noticeConfig.value)
}
// 获取消息数据
const getNoticeData = async () => {
  const res = await getAllNoticeApi(noticeConfig.value)
  noticeData.value = res.data.map(item => {
    item.datetime = moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')
    return item
  })
  noticeConfig.value.total = res.total
}
// 重置搜索
const resetSearch = () => {
  noticeConfig.value.title = ''
  getNoticeData()
}
// 删除消息
const deleteNotice = async (id) => {
  await deleteNoticeApi(id)
  ElMessage({
    type: 'success',
    message: '删除成功',
    customClass: 'pure-message'
  })
  getNoticeData()
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
      '确定要删除这些消息吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
    await multiDeleteNoticeApi(multipleSelection.value)
    ElMessage({
      type: 'success',
      message: '批量删除成功',
      customClass: 'pure-message'
    })
    getNoticeData()
  })
}
onMounted(() => getNoticeData())
</script>

<template>
<div class="padding">
  <el-card style="height: 75px">
    <el-form :inline="true" class="search_form">
      <el-form-item label="标题:">
        <el-input placeholder="请输入消息标题" size="small" v-model="noticeConfig.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :icon="Search" @click="getNoticeData">搜索</el-button>
        <el-button size="small" :icon="Refresh" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <div class="button">
      <el-button type="danger" size="small" @click="multiDelete">
        <el-icon class="el-icon--right">
          <Delete/>
        </el-icon>
        批量删除
      </el-button>
    </div>
    <el-scrollbar max-height="550px">
      <el-table :data="noticeData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column label="消息标识" width="120" align="center">
          <template #default="scope">
            <img class="notice-avatar" :src="scope.row.avatar" alt="消息标识">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="消息标题" width="150" align="center"/>
        <el-table-column prop="description" label="详细描述" align="center"/>
        <el-table-column prop="type" label="消息类型" width="120" align="center"/>
        <el-table-column prop="datetime" label="发送时间" width="200" align="center"/>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template #default="scope">
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="你确定删除吗?"
                @confirm="deleteNotice(scope.row.id)"
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
        v-model:current-page="noticeConfig.currentPage"
        v-model:page-size="noticeConfig.pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :small="true"
        :background="true"
        layout="prev, pager, next, jumper, total, sizes"
        :total="noticeConfig.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-card>
</div>
</template>

<style scoped lang="scss">
.padding {
  padding: 20px;
}
.search_form {
  display: flex;
  justify-content: space-between;
}
.button {
  margin: 0 0 10px 0;
}
.pager {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.notice-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 auto;
}
</style>