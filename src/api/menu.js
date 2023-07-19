import request from '@/utils/request.js'

export const getMenu = () => request({
    url: '/api/menu',
    method: 'get'
})