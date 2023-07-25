import {defineStore} from "pinia";
import {ref} from 'vue'
import {loginAPI, signAPI} from "@/api/user.js";

export const useUserStore = defineStore('user', () => {

    const userinfo = ref(JSON.parse(localStorage.getItem('userinfo')))

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

    // 退出登录
    const onLogout = () => {
        userinfo.value = {}
        localStorage.removeItem('userinfo')
    }

    return {
        userinfo,
        onLogin,
        onSign,
        onLogout
    }
})