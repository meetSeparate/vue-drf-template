<script setup>
defineProps({
  loading: Boolean,
})

import {useAnnouncement} from "@/views/Home/composable/hooks.js";

const {
  announcementVisible,
  announcementData,
  announcementForm,
  options,
  addAnnouncementData
} = useAnnouncement()

</script>

<template>
  <el-col :span="12">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统公告</span>
          <el-button class="button" size="small" type="primary" @click="announcementVisible=true">增加公告</el-button>
        </div>
      </template>
      <el-skeleton animated :rows="8" :loading="loading">
        <template #default>
          <el-scrollbar max-height="320px">
            <el-timeline>
              <el-timeline-item
                  v-for="(activity, index) in announcementData"
                  :key="index"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </template>
      </el-skeleton>
    </el-card>
  </el-col>

  <el-dialog v-model="announcementVisible" title="新增公告">
    <el-form :model="announcementForm" label-position="top">
      <el-form-item label="公告内容">
        <el-input
            :rows="2"
            type="textarea"
            placeholder="公告内容"
            v-model="announcementForm.content"
            autocomplete="off"/>
      </el-form-item>
      <el-form-item label="节点大小">
        <el-select v-model="announcementForm.size" class="m-2" placeholder="节点大小">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="节点颜色">
        <div class="anno-color">
          <el-input
              placeholder="节点颜色"
              v-model="announcementForm.color"
              autocomplete="off"/>
          <el-color-picker v-model="announcementForm.color" show-alpha/>
        </div>

      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="announcementVisible = false">取消</el-button>
        <el-button type="primary" @click="addAnnouncementData">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-timeline {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-card__body {
  min-height: 360px;
}

.anno-color {
  display: flex;
}
</style>