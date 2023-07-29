import {defineStore} from "pinia";
import {ref} from "vue";

export const useTabStore = defineStore('tab', () => {

    // 标签导航列表
    const tabList = ref([{
        path: '/layout/home',
        name: 'home',
        meta: {
            title: '首页',
            isMenu: true,
            icon: 'HomeFilled',
        },
    }])

    // 点击菜单时新增标签到标签列表
    const skipRouter = (item) => {
        const result = tabList.value.findIndex(ele => ele.name === item.name)
        result === -1 ? tabList.value.push(item) : ''
    }

    // 关闭标签
    const closeTab = (item) => {
        const result = tabList.value.findIndex(ele => ele.name === item.name)
        tabList.value.splice(result, 1)
    }

    return {
        tabList,
        skipRouter,
        closeTab
    }
})