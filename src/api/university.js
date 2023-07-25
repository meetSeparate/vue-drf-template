import request from '@/utils/request.js'

export const getUniversity = (data) => request({
    url: '/api/university',
    method: 'get',
    data: data
})