import request from "@/utils/request.js";

// 批量删除用户
export const multiDeleteUserApi = (data) => request({
    url: '/api/multi_user/',
    method: 'delete',
    data: {
        multiData: data
    }
})

// 批量删除角色
export const multiDeleteRoleApi = (data) => request({
    url: '/api/multi_role/',
    method: 'delete',
    data: {
        multiData: data
    }
})