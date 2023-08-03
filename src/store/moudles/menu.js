import {defineStore} from "pinia";
import {ref} from "vue";
import {getMenu} from "@/api/menu.js";

export const useMenuStore = defineStore('menuStore', () => {
    // 树形控件数据
    const dataSource = ref([])
    // 树形控件props
    const defaultProps = {
        children: 'children',
        label: 'label',
    }
    // 获取所有菜单及按钮权限
    const getMenuData = async () => {
        const res = await getMenu()
        dataSource.value = res.data
    }

    return {
        dataSource,
        defaultProps,
        getMenuData
    }
})