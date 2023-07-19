<script setup>
import {useTabStore} from "@/store/moudles/tab.js";
import {useRoute, useRouter} from "vue-router";

const tabStore = useTabStore()
const route = useRoute()
const router = useRouter()

// 关闭标签页
const handlerClose = (item, index) => {
  // 获取标签长度
  const length = tabStore.tabList.length

  // 关闭标签
  tabStore.closeTab(item)

  // 如果删除的不是当前页
  if (item.name !== route.name) {
    return
  }
  // 删除的为最后一个
  if (index === length - 1) {
    router.push(tabStore.tabList[index-1].path)
  } else {
    // 删除的不是最后一个
    router.push(tabStore.tabList[index].path)
  }
}

</script>

<template>
  <div class="tab" v-for="(item, index) of tabStore.tabList" :key="index">
    <div class="tab-item" :class="{'is-active': $route.name === item.name}">
      <div class="tab-flex">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
        <el-icon v-show="item.name!=='home'" @click="handlerClose(item, index)">
          <Close/>
        </el-icon>
      </div>
      <div :class="[$route.name === item.name ? 'schedule-active' : 'schedule']"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@keyframes scheduleOut {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

@keyframes scheduleIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.tab {
  list-style: none;
  overflow: visible;
  white-space: nowrap;
  user-select: none;

  .tab-item {
    border-radius: 3px 3px 0 0;
    padding: 0 6px;
    box-shadow: 0 0 1px #888;
    margin-right: 4px;
    height: 28px;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
    position: relative;
    transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1);

    .tab-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      .el-icon {
        display: none;
        color: #409eff;
        transition: all .5s;

        &:hover {
          border-radius: 50%;
          color: #fff;
          background: #b4bccc;
        }
      }
    }

    a {
      text-decoration: none;
      color: var(--el-text-color-primary);
      padding: 0 4px;
      cursor: pointer;
    }

    .schedule-active {
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: var(--el-color-primary);
    }

    .schedule {
      width: 0;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: var(--el-color-primary);
      animation: scheduleOut 200ms ease-in;
    }

    &.is-active {
      position: relative;
      color: #fff;

      a {
        color: #409eff;
      }

      .el-icon {
        display: block;
      }
    }

    &:hover {

      .tab-flex {

        .el-icon {
          display: block;
        }
      }

      .schedule {
        width: 100%;
        animation: scheduleIn 200ms ease-out;
      }

    }
  }

}
</style>