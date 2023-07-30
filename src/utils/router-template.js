import router from "@/router/index.js";

export const useRouterTemplate = () => {

    // 格式化路由
    const formatRoute = (menuAsyncRoute, modules) => {
        menuAsyncRoute.forEach(item => {
            item.component = modules[`../views/${item.component}`]
            if (!item.children||!item.children[0]||!item.children[0].component) {
                delete item['children']
            }
            if (item.children && item.children.length > 0) {
                formatRoute(item.children, modules)
            }
        })
    }
    // 动态注册路由
    const addAsyncRoute = (routes) => {
        // 拿到所有匹配到的路由
        const modules = import.meta.glob('../views/**/*.vue')
        // 格式化路由（component），去掉二级菜单的children
        formatRoute(routes, modules)
        routes.forEach(item => {
            router.addRoute(item)
        })
    }

    return {
        addAsyncRoute
    }
}