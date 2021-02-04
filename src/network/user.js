import service from './index'

export function getUserList_req(params) {
    return service({
        url: 'users',
        method: 'get',
        params: params
    })
}

export function modifyUserStatus_req(params) {
    return service({
        url: `users/${params.id}/state/${params.mg_state}`,
        method: 'put'
    })
}

export function addUser_req(data) {
    return service({
        url: 'users',
        method: 'post',
        data
    })
}

export function getUserInfo_req(id) {
    return service({
        url: `users/${id}`,
        method: 'get'
    })
}

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