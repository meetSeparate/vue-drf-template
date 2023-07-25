import axios from "axios";
// 引入进度条
import nprogress from 'nprogress'
import router from "@/router";
import {useUserStore} from "@/store/moudles/user.js";

// 引入nprogress的css样式
import 'nprogress/nprogress.css'
// 创建一个axios实例对象
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,

    // 超时时间
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((request) => {
    // 自定义headers
    const userStore = useUserStore()
    const token = userStore.userinfo ? userStore.userinfo.token : ''
    // jwt-token认证
    // 如果有token，在请求头中添加
    if (token) {
        request.headers.Authorization = `Bearer ${userStore.userinfo.token}`
    }
    nprogress.start()
    return request
})

// 响应拦截器
service.interceptors.response.use((response) => {
    nprogress.done()
    return response.data
}, (error) => {
    const userStore = useUserStore()
    nprogress.done()
    // 统一错误提示
    ElMessage({
        title: 'Error',
        message: error.response.data.msg,
        type: 'error',
        customClass: 'pure-message',
    })
    if (error.response.status === 401) {
        userStore.onLogout()
        router.push({
            name: 'login'
        })
    }
    return Promise.reject(error.response.data.msg)
})

// 封装的核心函数
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data

    }
    return service(options)
}

export default request