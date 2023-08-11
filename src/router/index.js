import {createRouter, createWebHashHistory} from "vue-router";
import constRoutes from "./routes.js";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {useUserStore} from "@/store/moudles/user.js";


const router = createRouter({
    history: createWebHashHistory(),
    routes: constRoutes,

    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    nprogress.start()
    // 用户仓库
    const userStore = useUserStore()
    const token = userStore.userinfo ? userStore.userinfo.token : ''
    if (token) {
        if (to.name === 'login' || to.name === 'sign') {
            next('/layout')
        } else {
            next()
        }
    } else {
        if (to.name !== 'login' && to.name !== 'sign') {
            next({name: 'login', query: {redirect: to.path}})
        } else {
            next()
        }
    }
})

router.afterEach((to) => {
    nprogress.done()
    document.title = `${to.meta.title}|EnyAdmin`
})

export default router