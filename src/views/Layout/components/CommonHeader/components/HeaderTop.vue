<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, computed} from "vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/moudles/user.js";
import {useSettingStore} from "@/store/moudles/settings.js";
import {useColorStore} from "@/store/moudles/settings.js";
import DarkSwitch from '@/components/DarkSwitch/index.vue'
import NoticeList from "@/components/Notice/NoticeList.vue";
import SearchFooter from "@/components/Search/SearchFooter.vue";
import {changePasswordApi} from "@/api/password.js";
import {getNoticeApi} from "@/api/notice.js";
import {Bell, Search, Setting, SwitchButton} from "@element-plus/icons-vue";
import {useTabStore} from "@/store/moudles/tab.js";
import { onKeyStroke } from "@vueuse/core";
import util from "@/utils/index.js";
import moment from "moment";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const colorStore = useColorStore()
const settingStore = useSettingStore()
const tabStore = useTabStore()

// 打开下拉菜单
const dropdown = ref(null)
const showClick = () => {
  if (!dropdown.value) return
  dropdown.value.handleOpen()
}
const settingsVisible = ref(false)
// 主题颜色
const themeColor = ref(['#2406e8', '#07a3d7', '#f56c6c', '#1fcf92'])
// 退出登录
const onLogout = () => {
  userStore.onLogout()
  router.push({
    name: 'login'
  })
  ElMessage({
    type: "success",
    message: '退出成功！',
    customClass: 'pure-message'
  })
}
// 消息内容
const noticesData = ref([
  {
    key: "1",
    name: "通知",
    list: []
  },
  {
    key: "2",
    name: "消息",
    list: []
  },
  {
    key: "3",
    name: "待办",
    list: []
  }
])
// 消息总数
const noticeCount = ref(1)
// 获取当前用户消息
const getUserNotice = async () => {
  const res = await getNoticeApi()
  const formatData = res.data.map(item => {
    item.datetime = moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')
    return item
  })
  formatData.forEach(ele => {
    if(ele.type===1) {
      noticesData.value[0].list.push(ele)
    } else if (ele.type===2) {
      noticesData.value[1].list.push(ele)
    } else {
      noticesData.value[2].list.push(ele)
    }
  })
  noticeCount.value = res.count
}
const activeKey = ref(noticesData.value[0].key)
// 全文搜索
const searchKeyword = ref('')
const showDialog = ref(false)
const resultOptions = ref([])
function handleClose() {
  showDialog.value = false;
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = [];
    searchKeyword.value = "";
  }, 200);
}
// 修改密码
const passwordVisible = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})
const passwordRef = ref()
// 关闭前回调
const passwordClose = () => {
  passwordVisible.value=false
  setTimeout(() => {
    passwordRef.value.resetFields()
  }, 200)
}
// 检查确认密码
// 检查手机号信息
const checkRePassword = (rule, value, callback) => {
  if (passwordForm.value.newPassword===value) {
    // 确认密码与密码一致
    return callback()
  }
  callback(new Error('确认密码与输入不一致'))
}
// 表单验证规则
const passwordRule = ref({
  oldPassword: [{required: true, message: '请输入原密码', trigger: 'blur'}],
  newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
  rePassword: [
      {required: true, message: '请输入确认密码', trigger: 'blur'},
      {validator: checkRePassword, trigger: 'blur'}
  ]
})
// 修改密码
const changePassword = async () => {
  if (!passwordRef.value) return
  await passwordRef.value.validate(async (valid) => {
    if (valid) {
      await changePasswordApi(passwordForm.value)
      ElMessage({
        type: 'success',
        message: '修改成功',
        customClass: 'pure-message'
      })
      passwordClose()
    } else {
      ElMessage({
        type: 'error',
        message: '请输入正确信息',
        customClass: 'pure-message'
      })
    }
  })
}
// 全文搜索
const activeIndex = ref(0)
// 当前选中的搜索对象
const activePath = computed(() => {
  return resultOptions.value[activeIndex.value]
})
const searchEvent = () => {
  const routeData = router.getRoutes()
  resultOptions.value = routeData.filter(ele => {
    if (ele.meta.title !== '登录' && searchKeyword.value) {
      return ele.meta.title.indexOf(searchKeyword.value) !== -1
    }
  })
}
// 搜索防抖函数
const debounceSearch = util.debounce(searchEvent, 1000)
// 改变选中
const changeActive = (index) => {
  activeIndex.value = index
}
// 跳转页面
const handleJump = () => {
  tabStore.skipRouter(activePath.value)
  router.push(activePath.value.path)
  passwordClose()
}
const handleUp = () => {
  if (activeIndex.value === 0) return
  activeIndex.value --
}
const handleDown = () => {
  if (activeIndex.value === resultOptions.value.length-1) return
  activeIndex.value ++
}
// 匹配路由对象数组去重
const routeResult = computed(() => {
  let info = {}
  return route.matched.reduce((cur, next) => {
    info[next.meta.title] ? '' : info[next.meta.title] = cur.push(next)
    return cur
  }, [])
})

onKeyStroke("Enter", handleJump)
onKeyStroke("ArrowUp", handleUp)
onKeyStroke("ArrowDown", handleDown)
onMounted(() => {
  colorStore.setColor()
  getUserNotice()
})
</script>

<template>
  <div class="header-top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
          v-for="(item, index) of routeResult"
          :key="index"
          :to="item.path"
          v-show="item.meta.title"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="menu-item">
      <el-icon class="search" @click="showDialog=true">
        <search />
      </el-icon>

      <el-dropdown trigger="click" placement="bottom-end">
        <span class="dropdown-badge navbar-bg-hover select-none">
          <el-icon class="bell" id="header-notice">
            <el-badge :value="noticeCount" :max="99" class="item">
              <bell style="width: 18px;height: 18px" />
            </el-badge>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-tabs :stretch="true" v-model="activeKey" class="dropdown-tabs">
              <template v-for="item in noticesData" :key="item.key">
                <el-tab-pane
                    :label="`${item.name}(${item.list.length})`"
                    :name="`${item.key}`"
                >
                  <el-scrollbar max-height="330px">
                    <div class="noticeList-container">
                      <notice-list :list="item.list" />
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
              </template>
            </el-tabs>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-icon class="search" id="header-translation">
            <svg-icon name="globalization" width="18px" height="18px"/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item
              :class="{active: settingStore.language==='zh-cn'}"
              @click="settingStore.toggleLocale('zh-cn')"
            >
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :class="{active: settingStore.language==='en'}"
              @click="settingStore.toggleLocale('en')"
            >
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="user">
        <el-dropdown ref="dropdown" trigger="contextmenu">
          <div class="el-dropdown-link" @click="showClick">
            <el-avatar
                :size="32"
                class="mr-3"
                src="src/assets/images/avatar.jpg"
            />
            <span>{{ userStore.userinfo.username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="passwordVisible=true">
                <el-icon><Edit /></el-icon>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item @click="onLogout">
                <el-icon>
                  <switch-button />
                </el-icon>
                退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-icon class="search" @click="settingsVisible=true" id="set-icon">
        <setting />
      </el-icon>
    </div>
  </div>

  <el-drawer
      v-model="settingsVisible"
      :show-close="true"
      size="350px"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">项目配置</h4>
    </template>
    <div class="border"></div>
    <el-divider>
      <span class="title">黑夜模式</span>
    </el-divider>

    <dark-switch />
    <el-divider>
      <span class="title">主题颜色</span>
    </el-divider>
    <div class="color-all">
      <el-tooltip
          v-for="item in themeColor"
          class="box-item"
          effect="dark"
          :content="item"
          placement="top"
          :key="item">
        <div class="color-item" :style="{backgroundColor: item}"></div>
      </el-tooltip>
      <el-color-picker v-model="colorStore.color" show-alpha @change="colorStore.setColor"/>
    </div>
  </el-drawer>
  <el-dialog
      top="5vh"
      width="50vw"
      v-model="showDialog"
      :before-close="handleClose"
  >
    <el-input
        ref="inputRef"
        v-model="searchKeyword"
        clearable
        placeholder="请输入关键词搜索"
        @input="debounceSearch"
    >
      <template #prefix>
        <span class="el-input__icon">
          <el-icon><Search /></el-icon>
        </span>
      </template>
    </el-input>
    <div class="search-result-container">
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <div class="search-result" v-else>
        <div
          v-for="(item, index) of resultOptions"
          class="search-item"
          :class="{active: activeIndex===index}"
          @click="handleJump()"
          @mouseenter="changeActive(index)"
        >
          <component :is="item.meta.icon||'Tickets'"/>
          <span class="title">{{item.meta.title}}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <search-footer />
    </template>
  </el-dialog>
  <el-dialog v-model="passwordVisible" title="修改密码" :before-close="passwordClose">
  <el-form ref="passwordRef" :model="passwordForm" :rules="passwordRule" label-position="top">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input v-model="passwordForm.oldPassword" placeholder="原密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="passwordForm.newPassword" placeholder="新密码" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="rePassword">
      <el-input v-model="passwordForm.rePassword" placeholder="确认密码" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordClose">取消</el-button>
        <el-button type="primary" @click="changePassword">确定</el-button>
      </span>
  </template>
</el-dialog>

</template>

<style scoped lang="scss">
.header-top {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 #0000;
  padding: 0 0 0 20px;

  .menu-item {
    display: flex;
    justify-content: flex-end;
    .search {
      width: 40px;
      height: 48px;
      cursor: pointer;

      &:hover {
        background: #f6f6f6
      }
    }
    .bell {
      width: 60px;
      height: 48px;
      cursor: pointer;

      &:hover {
        background: #f6f6f6
      }
    }
    .user {
      height: 48px;
      display: flex;
      align-items: center;
      padding: 5px;
      justify-content: center;

      &:hover {
        background: #f6f6f6
      }
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 5px;
  }
}
:deep(.el-dropdown-menu__item) {
  padding: 5px 20px;
}
:deep(.el-dropdown-menu__item.active) {
  background-color: var(--el-color-primary);
  color: #fff;
}
.border {
  width: 100%;
  border: 1px solid rgb(220, 223, 230);
}
.title {
  font-weight: 700;
  font-size: 16px;
}
.switch {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark {
  .menu-item {
    display: flex;
    justify-content: flex-end;

    .search {
      width: 40px;
      height: 48px;
      cursor: pointer;

      &:hover {
        background: #333
      }
    }

    .bell {
      width: 50px;
      height: 48px;
      cursor: pointer;

      &:hover {
        background: #333
      }
    }

    .user {
      height: 48px;
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: center;

      &:hover {
        background: #333
      }
    }
  }
}
.color-all {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .color-item {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    cursor: pointer;
  }
}
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 60px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}
.dropdown-tabs {
  width: 330px;

  .noticeList-container {
    padding: 15px 24px 0 24px;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }
}
.search-result {
  margin-top: 20px;
}
.search-item {
  width: 100%;
  height: 56px;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  transition: all 0.3s;
  border: 0.1px solid #ccc;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

}
.search-item.active {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>