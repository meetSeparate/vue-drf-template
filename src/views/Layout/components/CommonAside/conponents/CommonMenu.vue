<script>
export default {
  name: 'commonMenu'
}
</script>

<script setup>
import {useTabStore} from "@/store/moudles/tab.js";
import {useRouter} from "vue-router";

const router = useRouter()

defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const tabStore = useTabStore()

const changeRouter = (item) => {
  tabStore.skipRouter(item)
  router.push(item.path)
}

</script>

<template>
    <template v-for="item of menuList" :key="item.path">

      <!-- 一级菜单 -->
      <template v-if="!item.children">
        <el-menu-item :index="item.path" v-if="item.meta.isMenu" @click="changeRouter(item)">
          <el-icon>
            <component :is="item.meta.icon"/>
          </el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
      </template>

      <!-- 二级菜单且子菜单数量为一 -->
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item
            :index="item.children[0].path"
            v-if="item.children[0].meta.isMenu"
            @click="changeRouter(item.children[0])"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"/>
          </el-icon>
          <span>{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </template>

      <!-- 二级菜单且子菜单数量大于一 -->
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu
            :index="item.path"
            v-if="item.meta.isMenu"
          >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"/>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </template>
          <common-menu :menu-list="item.children"/>
        </el-sub-menu>
      </template>

    </template>
</template>

<style scoped lang="scss">
.el-menu-item {
  display: flex;
  align-items: center;
  height: 50px;

  &:hover {
    color: #fff;
  }

  &.is-active {

    &:before {
      margin: 4px 0;
      background: var(--el-color-primary) !important;
      position: absolute;
      content: "";
      clear: both;
      inset: 0 8px;
      border-radius: 3px;
    }
  }
}

.el-sub-menu {
  display: grid;

  .el-sub-menu__title {
    padding: 0;

    &:hover {
      span {
        color: #fff;
      }
    }
  }

  .el-menu-item {
    background-color: #0f0303;
  }
}

.el-menu-item.is-active > * {
  z-index: 99;
  color: #fff;
}

.el-sub-menu.is-active .el-sub-menu__title {
  svg {
    color: #fff;
  }

  span {
    color: #fff;
  }
}
</style>