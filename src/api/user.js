import request from '../utils/request.js'

/*
    项目api统一管理
 */

// 登录接口
export const loginAPI = (data) => request({
    url: '/api/login/',
    method: 'post',
    data: data
})
// 注册接口
export const signAPI = (data) => request({
    url: '/api/sign/',
    method: 'post',
    data: data
})
// 获取用户信息
export const getAccount = (data) => request({
    url: '/api/user',
    params: data
})
// 新增用户
export const addAccount = (data) => request({
    url:'/api/user/',
    method: 'post',
    data: data
})
// 编辑用户
export const editAccount = (data) => request({
    url: '/api/user/',
    method: 'put',
    data: data
})
// 删除用户
export const deleteUser = (id) => request({
    url: '/api/user/',
    method: 'delete',
    data: {
        id
    }
})


// 开始检测
export const startDetectApi = (data) => {
    return request({
        url: '/api/detect/',
        method: 'post',
        data
    })
}

// 获取检测记录
export const getRecordApi = () => {
    return request({
        url: '/api/record',
        method: 'get'
    })
}

// 获取检测记录
export const delRecordApi = (id) => {
    return request({
        url: '/api/record',
        method: 'delete',
        data: {
            id
        }
    })
}