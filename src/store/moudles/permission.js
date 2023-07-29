import {defineStore} from "pinia";
import {ref} from "vue";
import {getRoute} from "@/api/route.js";
import constRoute from '@/router/routes.js'
import {useRouterTemplate} from "@/utils/router-template.js";

export const usePermissionStore = defineStore('permissionStore', () => {
    // 路由信息
    const asyncRoute = ref(JSON.parse(localStorage.getItem('asyncRoute')))
    // 纯菜单路由
    const menuAsyncRoute = ref(JSON.parse(localStorage.getItem('asyncRoute')))
    const {addAsyncRoute} = useRouterTemplate()
    // 权限控制显示路由
    let routes = ref([constRoute])
    if (menuAsyncRoute.value) {
        routes = [...constRoute, ...menuAsyncRoute.value]
    }
    // 获取路由
    const getAsyncRoute = async () => {
        const res = await getRoute()
        asyncRoute.value = res.data
        menuAsyncRoute.value = res.data
        // 将格式化后的异步路由动态注册到路由中
        addAsyncRoute()
        localStorage.setItem('asyncRoute', JSON.stringify(res.data))
    }

    return {
        asyncRoute,
        menuAsyncRoute,
        routes,
        getAsyncRoute,
    }
})