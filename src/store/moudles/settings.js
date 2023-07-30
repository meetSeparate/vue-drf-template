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

export const useColorStore = defineStore('colorStore', () => {
    const color = ref(localStorage.getItem('color') || '#409eff')

    const setColor = () => {
        const el = document.documentElement
        // 设置 css 变量
        el.style.setProperty('--el-color-primary', color.value)
        el.style.setProperty('--el-color-primary-light-3', color.value)
        localStorage.setItem('color', color.value)
    }

    return {
        color,
        setColor
    }
})