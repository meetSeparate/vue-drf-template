const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login/index.vue'),
        meta: {
            title: '登录',
            isMenu: false
        }
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/layout/home',
        meta: {
            title: '首页',
            isMenu: true
        },
        children: [
            {
                path: '/layout/home',
                name: 'home',
                component: () => import('../views/Home/index.vue'),
                meta: {
                    title: '首页',
                    isMenu: true,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/Error/404.vue'),
        meta: {
            title: '404',
            isMenu: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '404',
            isMenu: false
        }
    }
]

export default routes