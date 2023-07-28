import request from "@/utils/request.js";

// 获取路由
export const getRoute = () => request({
    url: '/api/route',
    method: 'get'
})