import request from '@/utils/request.js'

export const getPersonal = () => request({
    url: '/api/personal/'
})

export const editPersonal = (data) => request({
    url: '/api/personal/',
    method: 'put',
    data: data
})