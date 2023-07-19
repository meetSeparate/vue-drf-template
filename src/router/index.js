import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./routes.js";
import {useUserStore} from "@/store/moudles/user.js";

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,

    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    nprogress.start()
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
            console.log(from)
            next({name: 'login', query: {redirect: to.path}})
        } else {
            next()
        }
    }
})

router.afterEach((to) => {
    nprogress.done()
    document.title = `${to.meta.title}|运营管理系统`
})

export default router