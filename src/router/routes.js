const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login/index.vue'),
        meta: {
            title: '登录',
            isMenu: false,
        }
    },

    {
        path: '/layout',
        name: 'layout',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/layout/home',
        meta: {
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
                    icon: 'HomeFilled',
                }
            }
        ]
    },

    {
        path: '/error',
        name: 'error',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/error/403',
        meta: {
            title: '异常页面',
            isMenu: true,
            icon: 'Warning',
        },
        children: [
            {
                path: '/error/403',
                name: '403',
                component: () => import('../views/Error/403.vue'),
                meta: {
                    title: '403',
                    isMenu: true
                }
            },

            {
                path: '/error/404',
                name: '404',
                component: () => import('../views/Error/404.vue'),
                meta: {
                    title: '404',
                    isMenu: true
                }
            },

            {
                path: '/error/500',
                name: '500',
                component: () => import('../views/Error/500.vue'),
                meta: {
                    title: '500',
                    isMenu: true
                }
            }
        ]
    },

    {
        path: '/permission',
        name: 'permissions',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/permission/menu',
        meta: {
            title: '权限管理',
            isMenu: true,
            icon: 'Lollipop'
        },
        children: [
            {
                path: '/permission/menu',
                name: 'menu',
                component: () => import('../views/Permission/Menu.vue'),
                meta: {
                    title: '菜单权限',
                    isMenu: true
                }
            },
            {
                path: '/permission/button',
                name: 'button',
                component: () => import('../views/Permission/Button.vue'),
                meta: {
                    title: '按钮权限',
                    isMenu: true
                }
            }
        ]
    },

    {
        path: '/user',
        name: 'user',
        component: () => import('../views/Layout/index.vue'),
        redirect: '/user/account',
        meta: {
            title: '用户管理',
            isMenu: true,
            icon: 'User'
        },
        children: [
            {
                path: '/user/account',
                name: 'account',
                component: () => import('../views/User/Account.vue'),
                meta: {
                    title: '帐号管理',
                    isMenu: true
                }
            },
            {
                path: '/permission/role',
                name: 'role',
                component: () => import('../views/User/Role.vue'),
                meta: {
                    title: '角色管理',
                    isMenu: true
                }
            }
        ]
    },

]

export default routes