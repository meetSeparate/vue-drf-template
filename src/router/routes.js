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
        path: '/mask',
        name: 'mask',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/mask/drawing',
        meta: {
            title: '生成Mask',
            isMenu: true
        },
        children: [
            {
                path: '/mask/drawing',
                name: 'drawing',
                component: () => import('../views/Mask/index.vue'),
                meta: {
                    title: '生成Mask',
                    isMenu: true,
                    icon: 'CameraFilled'
                }
            }
        ]
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/upload/index',
        meta: {
            title: '图像修复',
            isMenu: true
        },
        children: [
            {
                path: '/upload/index',
                name: 'index',
                component: () => import('../views/Upload/index.vue'),
                meta: {
                    title: '图像修复',
                    isMenu: true,
                    icon: 'PictureFilled'
                }
            }
        ]
    },
    {
        path: '/recode',
        name: 'recode',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/recode/image',
        meta: {
            title: '图像修复记录',
            isMenu: true
        },
        children: [
            {
                path: '/recode/image',
                name: 'image',
                component: () => import('../views/Record/index.vue'),
                meta: {
                    title: '图像修复记录',
                    isMenu: true,
                    icon: 'PictureFilled'
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