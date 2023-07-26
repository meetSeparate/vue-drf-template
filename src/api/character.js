import request from '@/utils/request.js'


// 获取所有角色信息接口
export const getCharacter = (config) => request({
    url: '/api/character',
    method: 'get',
    data: config
})

// 新增角色
export const addCharacter = (data) => request({
    url: '/api/character/',
    method: 'post',
    data: data
})

// 修改角色
export const editCharacter = (data) => request({
    url: '/api/character/',
    method: 'put',
    data: data
})

// 删除角色
export const deleteCharacter = (id) => request({
    url: '/api/character/',
    method: 'delete',
    data: {id}
})