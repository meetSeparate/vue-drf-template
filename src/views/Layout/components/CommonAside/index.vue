<script setup>
import CommonMenu from './conponents/CommonMenu.vue'
import {usePermissionStore} from "@/store/moudles/permission.js";
import {useCollapseStore} from "@/store/moudles/settings.js";

const permissionStore = usePermissionStore()
const collapseStore = useCollapseStore()

</script>

<template>
  <el-aside :width="!collapseStore.isCollapse ? '210px' : '60px'">
    <div class="logo">
      <router-link to="/layout" class="logo-link">
        <img src="@/assets/icons/avatar.svg" alt="">
        <span class="title">
            EnyAdmin
          </span>
      </router-link>
    </div>
    <el-scrollbar class="scrollbar">
      <el-menu
          active-text-color="#fff"
          background-color="#001529"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#969fa7"
          :collapse="collapseStore.isCollapse"
      >
      <common-menu :menu-list="permissionStore.routes"/>
      </el-menu>
    </el-scrollbar>

    <div class="folding">
      <el-tooltip
          class="box-item"
          effect="dark"
          :content="collapseStore.isCollapse ? '点击展开菜单': '点击折叠菜单'"
          placement="right-start"
      >
        <component
            :is="collapseStore.isCollapse ? 'Expand' : 'Fold'"
            @click="collapseStore.collapseMenu"
        ></component>
      </el-tooltip>
    </div>

  </el-aside>
</template>

<style scoped lang="scss">

.el-aside {
  height: 100vh;
  position: relative;
  background-color: #001529;
  transition: all .5s;

  .logo {
    background: #002140;
    position: relative;
    width: 100%;
    height: 52px;
    overflow: hidden;

    .logo-link {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      height: 100%;
      padding-left: 15px;
    }

    img {
      display: inline-block;
      height: 32px;
    }

    .title {
      color: #fff;
      display: inline-block;
      height: 32px;
      margin: 2px 0 0 12px;
      overflow: hidden;
      font-size: 18px;
      font-weight: 600;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.scrollbar {
  height: calc(100vh - 92px);
}

.folding {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 15px;
  box-shadow: 0 0 6px -2px var(--el-color-primary);

  svg {
    width: 16px;
    height: 16px;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}

.el-menu {
  border: none;
}

@media screen and (max-width: 700px) {
  .el-aside {
    width: 50px;
  }
}
</style>