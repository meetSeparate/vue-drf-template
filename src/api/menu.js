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

// 编辑菜单
export const editMenu = (data) => request({
    url: '/api/menu/',
    method: 'put',
    data: data
})

// 删除菜单
export const deleteMenu = (data) => request({
    url: '/api/menu/',
    method: 'delete',
    data: data
})