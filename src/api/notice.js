import request from '@/utils/request.js'

// 批量发送消息
export const sendNoticeApi = (data) => request({
    url: '/api/notice/',
    method: 'post',
    data
})
// 获取当前用户的消息
export const getNoticeApi = () => request({
    url: '/api/notice/',
    method: 'get'
})
// 获取所有消息
export const getAllNoticeApi = (params) => request({
    url: '/api/all_notice',
    method: 'get',
    params
})
// 删除对应消息
export const deleteNoticeApi = (id) => request({
    url: '/api/all_notice',
    method: 'delete',
    data: {id}
})
// 获取对应用户消息
export const getUserNoticeApi = (id) => request({
    url: '/api/user_notice',
    method: 'get',
    params: {id}
})
// 删除对应用户消息
export const deleteUserNoticeApi = (data) => request({
    url: '/api/user_notice/',
    method: 'delete',
    data
})