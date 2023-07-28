import {defineStore} from "pinia";
import {ref} from 'vue'
import {loginAPI, signAPI} from "@/api/user.js";
import {getRoute} from "@/api/route.js";
import router from "@/router/index.js";

export const useUserStore = defineStore('user', () => {

    // 用户信息
    const userinfo = ref(JSON.parse(localStorage.getItem('userinfo')))
    // 路由信息
    const asyncRoute = ref(JSON.parse(localStorage.getItem('asyncRoute')))

    // 登录操作
    const onLogin = async (data) => {
        const res = await loginAPI(data)
        userinfo.value = res
        localStorage.setItem('userinfo', JSON.stringify(res))
    }
    // 注册
    const onSign = async (data) => {
        await signAPI(data)
    }
    // 获取路由
    const getAsyncRoute = async () => {
        const res = await getRoute()
        asyncRoute.value = res.data
        localStorage.setItem('asyncRoute', JSON.stringify(res.data))
    }
    // 动态添加路由
    const addRoute = () => {
        console.log(router.getRoutes())
        console.log(asyncRoute.value)
    }

    // 退出登录
    const onLogout = () => {
        userinfo.value = {}
        localStorage.removeItem('userinfo')
        localStorage.removeItem('asyncRoute')
    }

    return {
        userinfo,
        onLogin,
        onSign,
        onLogout,
        getAsyncRoute,
        addRoute
    }
})