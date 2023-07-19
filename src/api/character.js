import request from '@/utils/request.js'


// 获取所有角色信息接口
export const getCharacter = (config) => request({
    url: '/api/character',
    method: 'get',
    data: config
})