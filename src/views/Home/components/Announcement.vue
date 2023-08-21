<script setup>
import {Delete, InfoFilled} from "@element-plus/icons-vue";
import {useAnnouncement} from "@/views/Home/composable/hooks.js";
import {useUserStore} from "@/store/moudles/user.js";
import TypeIt from "@/components/ReTypeit/index.js";


defineProps({
  loading: Boolean,
})
const userStore = useUserStore()
const {
  announcementVisible,
  announcementData,
  announcementForm,
  options,
  deleteAnno,
  addAnnouncementData
} = useAnnouncement()

</script>

<template>
  <el-card>
      <template #header>
        <div class="card-header">
          <TypeIt
              :className="'type-it2'"
              :values="['系统公告']"
              :cursor="false"
              :speed="80"
          />
          <el-button
              v-if="userStore.userinfo.role==='管理员'"
              class="button" size="small" type="primary"
              @click="announcementVisible=true"
          >增加公告</el-button>
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
                  :icon="activity.icon"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
              >
                <div style="position: relative">
                  <span>{{ activity.content }}</span>
                  <el-popconfirm
                      v-if="userStore.userinfo.role==='管理员'"
                      width="220"
                      confirm-button-text="OK"
                      cancel-button-text="No, Thanks"
                      :icon="InfoFilled"
                      icon-color="#626AEF"
                      title="Are you sure to delete this?"
                      @confirm="deleteAnno(activity.id)"
                  >
                    <template #reference>
                      <el-button
                          style="position: absolute;right: 10px"
                          type="danger"
                          :icon="Delete"
                          link
                      ></el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </template>
      </el-skeleton>
    </el-card>

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