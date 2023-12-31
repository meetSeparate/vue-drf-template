import request from '../utils/request.js'

// 获取公告内容
export const getAnnouncement = () => request({
    url: '/api/announcement',
})

// 新增公告内容
export const addAnnouncement = (data) => request({
    url: '/api/announcement/',
    method: 'post',
    data: data
})
// 删除公告
export const deleteAnnouncement = (id) => request({
    url: '/api/announcement/',
    method: 'delete',
    data: {id}
})