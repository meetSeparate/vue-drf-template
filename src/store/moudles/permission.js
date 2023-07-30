import {defineStore} from "pinia";
import {ref, computed} from "vue";
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
    const routes = computed(() => {
        return [...constRoute, ...menuAsyncRoute.value]
    })
    // 获取路由并动态注册
    const getAsyncRoute = async () => {
        const res = await getRoute()
        asyncRoute.value = res.data
        menuAsyncRoute.value = res.data
        localStorage.setItem('primitiveRoute', JSON.stringify(res.data))
        // 将格式化后的异步路由动态注册到路由中
        addAsyncRoute(menuAsyncRoute.value)
        localStorage.setItem('asyncRoute', JSON.stringify(menuAsyncRoute.value))
    }

    return {
        asyncRoute,
        menuAsyncRoute,
        routes,
        getAsyncRoute,
    }
})