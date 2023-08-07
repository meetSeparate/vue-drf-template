import request from '@/utils/request.js'

export const sendNoticeApi = (data) => request({
    url: '/api/notice/',
    method: 'post',
    data
})