<script setup>
import {ref} from 'vue'
import {Delete, InfoFilled, Refresh, Search} from "@element-plus/icons-vue";

const noticeSearchForm = ref({
  title: ''
})
// 消息数据
const noticeData = ref([])
</script>

<template>
<div class="padding">
  <el-card style="height: 75px">
    <el-form :inline="true" class="search_form">
      <el-form-item label="标题:">
        <el-input placeholder="请输入消息标题" size="small" v-model="noticeSearchForm.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :icon="Search">搜索</el-button>
        <el-button size="small" :icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <div class="button">
      <el-button type="danger" size="small">
        <el-icon class="el-icon--right">
          <Delete/>
        </el-icon>
        批量删除
      </el-button>
    </div>
    <el-scrollbar max-height="550px">
      <el-table :data="noticeData" style="width: 100%">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column prop="avatar" label="消息标识" width="120" align="center"/>
        <el-table-column prop="title" label="消息标题" width="150" align="center"/>
        <el-table-column prop="description" label="详细描述" width="600" align="center"/>
        <el-table-column prop="type" label="消息类型" width="120" align="center"/>
        <el-table-column prop="datetime" label="发送时间" width="200" align="center"/>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template #default>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="你确定删除吗?"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" size="small" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
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
</style>