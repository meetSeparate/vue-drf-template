import request from "@/utils/request.js";

export const changePasswordApi = (data) => request({
    url: '/api/edit_password/',
    method: 'post',
    data: data
})