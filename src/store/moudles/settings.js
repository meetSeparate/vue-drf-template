import {defineStore} from "pinia";
import {ref} from 'vue'

export const useSettingStore = defineStore('settingStore', () => {
    const refresh = ref(false)

    const changeRefresh = () => {
        refresh.value = !refresh.value
    }

    return {
        refresh,
        changeRefresh
    }
})


export const useCollapseStore = defineStore('collapse', () => {
    // 控制折叠
    const isCollapse = ref(false)

    // 折叠或展开菜单
    const collapseMenu = () => {
        isCollapse.value = !isCollapse.value
    }

    return {
        isCollapse,
        collapseMenu
    }
})