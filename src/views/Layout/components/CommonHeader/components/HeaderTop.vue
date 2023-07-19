<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/moudles/user.js";
import DarkSwitch from '@/components/DarkSwitch/index.vue'

const router = useRouter()
const userStore = useUserStore()

// 打开下拉菜单
const dropdown = ref(null)
const showClick = () => {
  if (!dropdown.value) return
  dropdown.value.handleOpen()
}

const settingsVisible = ref(false)

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
      <el-icon class="search">
        <Search/>
      </el-icon>

      <el-icon class="bell">
        <el-badge :value="100" :max="10" class="item">
          <Bell/>
        </el-badge>
      </el-icon>

      <div class="user">
        <el-dropdown ref="dropdown" trigger="contextmenu">
          <div class="el-dropdown-link" @click="showClick">
            <el-avatar
                :size="32"
                class="mr-3"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />

            <span>
                    {{ userStore.userinfo.username }}
                  </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onLogout">
                <el-icon>
                  <SwitchButton/>
                </el-icon>
                退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-icon class="search" @click="settingsVisible=true">
        <Setting/>
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
      <span class="title">主题</span>
    </el-divider>

    <dark-switch />
  </el-drawer>
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
</style>