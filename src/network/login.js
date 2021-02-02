// import  { service }  from './index.js'
import  service  from './index.js'
// es6模块导入与导出，export default 对应 无{ }

export function login_request(data) {
    return service({
        url: 'login',
        method: 'post',
        data
    })
}