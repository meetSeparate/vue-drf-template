<script setup>
import {ref, onMounted} from "vue";
import {Delete, Edit, InfoFilled, Plus, Search, Refresh} from "@element-plus/icons-vue";
import {useGetCharacter} from "@/views/User/composable/hooks.js";

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

onMounted(() => getCharacterData(config.value))
</script>

<template>
<div class="container">

  <!-- 头部搜索栏 -->
  <el-card style="height: 75px">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="角色名:">
        <el-input v-model="config.searchInfo" placeholder="角色名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" :icon="Search">搜索</el-button>
        <el-button size="small" :icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 表格信息 -->
  <el-card style="margin-top: 20px">
    <div class="operation">
      <el-button type="primary" size="small" :icon="Plus">新增角色</el-button>
      <el-button type="danger" size="small" :icon="Delete">批量删除</el-button>
    </div>

    <div class="table">
      <el-table
          ref="multipleTableRef"
          :data="characterData"
          style="width: 100%"
      >
        <el-table-column fixed type="selection" />
        <el-table-column property="id" label="Id" align="center" />
        <el-table-column property="title" label="角色" show-overflow-tooltip align="center" />
        <el-table-column property="create_date" label="创建时间" show-overflow-tooltip align="center" />
        <el-table-column property="change_date" label="修改时间" show-overflow-tooltip align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" size="small"/>
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