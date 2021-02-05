import service from './index'

// 获取所有权限列表
export function getAuthority_req (type) {
    return service({
        url: 'rights/list',
        method: 'get'
    })
}

// 
export function getRolelist_req () {
    return service({
        url: 'roles',
        method: 'get'
    })
}

// 删除某个角色的某个权限
export function deleteAuth_req (roleId, rightId) {
    return service({
        url: `roles/${roleId}/rights/${rightId}`,
        method: 'delete'
    })
}

// 获取树形权限列表
export function getAuthTree_req () {
    return service({
        url: 'rights/tree',
        method: 'get'
    })
}

// 为角色分配权限
export function allotAuth_req (roleId, data) {
    return service({
        url: `roles/${roleId}/rights`,
        method: 'post',
        data
    })
}

