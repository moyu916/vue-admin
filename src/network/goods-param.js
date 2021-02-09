import  service  from './index.js'

// 查询所有分类
export function getCateList_req() {
    return service({
        url: 'categories',
        method: 'get'
    })
}

// 查询某第三极分类商品的参数，传入静态属性or动态属性
export function getParams_req(cateId, params) {
    return service({
        url: `categories/${cateId}/attributes`,
        method: 'get',
        params: params
    })
}

// 修改，与上边查询对应
export function modifyParams_req(cateId, attrId, data) {
    return service({
        url: `categories/${cateId}/attributes/${attrId}`,
        method: 'put',
        data
    })
}


export function addParams_req(cateId, data) {
    return service({
        url: `categories/${cateId}/attributes`,
        method: 'post',
        data
    })
}

// 查询某个三级分类的某个属性参数，展示修改对话框用
export function getAttrParams_req(cateId, attrId, params) {
    return service({
        url: `categories/${cateId}/attributes/${attrId}`,
        method: 'get',
        params: params
    })
}


export function deleteParams_req(cateId, attrId) {
    return service({
        url: `categories/${cateId}/attributes/${attrId}`,
        method: 'delete',
    })
}

export function saveAttrVals_req(cateId, attrId, data) {
    return service({
        url: `categories/${cateId}/attributes/${attrId}`,
        method: 'put',
        data: data
    })
}