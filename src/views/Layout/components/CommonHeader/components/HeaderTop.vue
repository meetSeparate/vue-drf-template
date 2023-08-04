<script setup>
import {useRouter} from "vue-router";
import {ref, onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/moudles/user.js";
import {useColorStore} from "@/store/moudles/settings.js";
import DarkSwitch from '@/components/DarkSwitch/index.vue'
import NoticeList from "@/components/Notice/NoticeList.vue";
import SearchFooter from "@/components/Search/SearchFooter.vue";
import {Bell, Search, Setting, SwitchButton} from "@element-plus/icons-vue";

const router = useRouter()
const userStore = useUserStore()
const colorStore = useColorStore()

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
    list: [
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "你收到了 12 份新周报",
        datetime: "一年前",
        description: "",
        type: "1"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "你推荐的 前端高手 已通过第三轮面试",
        datetime: "一年前",
        description: "",
        type: "1"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
        title: "这种模板可以区分多种通知类型",
        datetime: "一年前",
        description: "",
        type: "1"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title:
            "展示标题内容超过一行后的处理方式，如果内容超过1行将自动截断并支持tooltip显示完整标题。",
        datetime: "一年前",
        description: "",
        type: "1"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "左侧图标用于区分不同的类型",
        datetime: "一年前",
        description: "",
        type: "1"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "左侧图标用于区分不同的类型",
        datetime: "一年前",
        description: "",
        type: "1"
      }
    ]
  },
  {
    key: "2",
    name: "消息",
    list: [
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "李白 评论了你",
        description: "长风破浪会有时,直挂云帆济沧海",
        datetime: "一年前",
        type: "2"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "李白 回复了你",
        description: "行路难，行路难，多歧路，今安在。",
        datetime: "一年前",
        type: "2"
      },
      {
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "标题",
        description:
            "请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容",
        datetime: "一年前",
        type: "2"
      }
    ]
  },
  {
    key: "3",
    name: "代办",
    list: [
      {
        avatar: "",
        title: "任务名称",
        description: "任务需要在 2022-11-16 20:00 前启动",
        datetime: "",
        extra: "未开始",
        status: "info",
        type: "3"
      },
      {
        avatar: "",
        title: "第三方紧急代码变更",
        description:
            "一拳提交于 2022-11-16，需在 2022-11-18 前完成代码变更任务",
        datetime: "",
        extra: "马上到期",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "信息安全考试",
        description: "指派小仙于 2022-12-12 前完成更新并发布",
        datetime: "",
        extra: "已耗时 8 天",
        status: "warning",
        type: "3"
      },
      {
        avatar: "",
        title: "vue-pure-admin 版本发布",
        description: "vue-pure-admin 版本发布",
        datetime: "",
        extra: "进行中",
        type: "3"
      }
    ]
  }
])
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
onMounted(() => colorStore.setColor())
</script>

<template>
  <div class="header-top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
          v-for="(item, index) of $route.matched"
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
          <el-icon class="bell">
            <el-badge :value="100" :max="99" class="item">
              <bell />
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


      <div class="user">
        <el-dropdown ref="dropdown" trigger="contextmenu">
          <div class="el-dropdown-link" @click="showClick">
            <el-avatar
                :size="32"
                class="mr-3"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span>{{ userStore.userinfo.username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
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

      <el-icon class="search" @click="settingsVisible=true">
        <setting />
      </el-icon>
    </div>
  </div>

  <el-drawer
      v-model="settingsVisible"
      :show-close="true"
      size="20%"
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
    >
      <template #prefix>
        <span class="el-input__icon">
          <el-icon><Search /></el-icon>
        </span>
      </template>
    </el-input>
    <div class="search-result-container">
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
    </div>
    <template #footer>
      <search-footer />
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
      width: 50px;
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
      padding: 10px;
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
  //
  //// 如果上面的 notices 长度大于 3 请注释掉下面代码
  //:deep(.el-tabs__nav-wrap) {
  //  padding: 0 36px 0 36px;
  //}
  //
  //// 如果上面的 notices 长度大于 3 请注释掉下面代码
  //:deep(.el-tabs__active-bar) {
  //  margin: 0 36px 0 36px;
  //}
}
</style>