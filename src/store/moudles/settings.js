import {defineStore} from "pinia";
import {ref, computed} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const useSettingStore = defineStore('settingStore', () => {
    // 刷新组件页面
    const refresh = ref(false)
    // ElementPlus国际化
    const language = ref('zh-cn')
    const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
    // 刷新按钮
    const changeRefresh = () => {
        refresh.value = !refresh.value
    }
    // 切换语言配置
    const toggleLocale = (info) => {
        language.value = info
    }

    return {
        refresh,
        locale,
        language,
        changeRefresh,
        toggleLocale
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