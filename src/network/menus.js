import service from './index'

export function getMenuList_req() {
    return service({
        url: 'menus',
        method: 'get'
    })
}