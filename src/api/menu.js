import request from '@/utils/request.js'

// 获取菜单
export const getMenu = () => request({
    url: '/api/menu',
    method: 'get'
})

// 新增菜单
export const addMenu = (data) => request({
    url: '/api/menu/',
    method: 'post',
    data: data
})