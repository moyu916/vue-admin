import  service  from './index.js'

// 商品列表
export function getGoodsList_req(data) {
    return service({
        url: 'goods',
        method: 'get',
        params: data
    })
}

// 删除商品
export function deleteGood_req(id) {
    return service({
        url: `goods/${ id }`,
        method: 'delete',
    })
}

// 添加商品
export function addGood_req(data) {
    return service({
        url: `goods`,
        method: 'post',
        data
    })
}