<script setup>
import vueDanmaku from 'vue3-danmaku'
import {ref} from "vue";
import {useEditPersonal, useGetPersonal} from "@/views/Home/composable/hooks.js";

const danmus = [
  {
    color: 'red',
    text: '太棒了！'
  },
  {
     color: 'green',
    text: '我擦，怎么这么强！'
  },
  {
    color: '#fc542f',
    text: '爱了爱了，这个系统只因天上有，人间难得几回闻。'
  },
  {
    color: '#64d270',
    text: '给大佬跪了，请务必教我怎么制作！！！'
  },
  {
    color: '#3a6cf1',
    text: '怎么能有这么好的系统，样式好看，功能完善，怎么能这么完美！'
  },
]

// 获取个人信息
const {personal, getPersonalObject} = useGetPersonal()
// 修改个人信息
const {editFormVisible, userRules, editPersonalObject} = useEditPersonal()

defineProps({
  loading: Boolean,
  personal: {
    type: Object,
    default: () => {}
  }
})


</script>

<template>
  <el-col :span="12">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <el-button class="button" size="small" type="primary" @click="editFormVisible=true">修改个人信息</el-button>
        </div>
      </template>
      <el-skeleton animated :rows="8" :loading="loading">
        <el-descriptions
            direction="vertical"
            :column="6"
            border
        >
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <UserFilled/>
                </el-icon>
                用户名
              </div>
            </template>
            {{personal.username}}
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <PhoneFilled/>
                </el-icon>
                手机号
              </div>
            </template>
            {{ personal.phone }}
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Avatar/>
                </el-icon>
                姓名
              </div>
            </template>
            {{personal.name}}
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <InfoFilled/>
                </el-icon>
                性别
              </div>
            </template>
            {{personal.gender}}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <StarFilled/>
                </el-icon>
                年龄
              </div>
            </template>
            <el-tag size="small">{{personal.age}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Flag/>
                </el-icon>
                角色
              </div>
            </template>
            {{personal.role}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <TrendCharts/>
                </el-icon>
                好好学习，天天向上
              </div>
            </template>
            Heaven moves, the gentleman to self-improvement!
          </el-descriptions-item>
        </el-descriptions>
        <vue-danmaku
            ref="danmaku"
            loop
            useSlot
            isSuspend
            randomChannel
            :debounce="1200"
            :danmus="danmus"
            style="width: 100%; height: 80px"
        >
          <template v-slot:dm="{ danmu }">
            <p :style="{ color: danmu.color}">
              {{ danmu.text }}
            </p>
          </template>
        </vue-danmaku>
      </el-skeleton>
    </el-card>
  </el-col>

  <el-dialog
      v-model="editFormVisible"
      title="修改个人信息"
  >
    <el-form
        ref="userFormRef"
        :model="personal"
        label-position="top"
        :rules="userRules"
        status-icon>
      <el-form-item
          label="用户名"
          prop="username"
      >
        <el-input v-model="personal.username" autocomplete="off" placeholder="用户名"/>
      </el-form-item>
      <el-form-item
          label="姓名"
          prop="name"
      >
        <el-input v-model="personal.name" autocomplete="off" placeholder="姓名"/>
      </el-form-item>
      <el-form-item
          label="性别"
          prop="gender"
      >
        <el-input v-model="personal.gender" autocomplete="off" placeholder="性别"/>
      </el-form-item>
      <el-form-item
          label="年龄"
          prop="age"
      >
        <el-input v-model.number="personal.age" autocomplete="off" placeholder="年龄"/>
      </el-form-item>
      <el-form-item
          label="联系方式"
          prop="phone"
      >
        <el-input v-model="personal.phone" autocomplete="off" placeholder="联系方式"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFormVisible=false">取消</el-button>
        <el-button type="primary" @click="editPersonalObject(personal, getPersonalObject)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-col {
  padding: 0 12px;
  margin-bottom: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.cell-item {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #606266;
}
</style>