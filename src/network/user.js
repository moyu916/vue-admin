import service from './index'

// 请求用户信息列表
export function getUserList_req(params) {
    return service({
        url: 'users',
        method: 'get',
        params: params
    })
}

// 修改某个用户状态
export function modifyUserStatus_req(params) {
    return service({
        url: `users/${params.id}/state/${params.mg_state}`,
        method: 'put'
    })
}

// 添加新用户
export function addUser_req(data) {
    return service({
        url: 'users',
        method: 'post',
        data
    })
}

// 请求某个用户的信息
export function getUserInfo_req(id) {
    return service({
        url: `users/${id}`,
        method: 'get'
    })
}

// 修改某个用户信息
export function modifyUserInfo_req(data) {
    return service({
        url: `users/${data.id}`,
        method: 'put',
        data:{
            email: data.email,
            mobile: data.mobile
        }
    })
}

// 删除某个用户信息
export function deleteUserInfo_req(id) {
    return service({
        url: `users/${id}`,
        method: 'delete',
    })
}