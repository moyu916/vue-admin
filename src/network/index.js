import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器

export default service

// export function service(config) {
//   const install = axios.create({
//     baseURL: 'http://127.0.0.1:8888/api/private/v1/', // api的base_url
//     timeout: 5000 // 请求超时时间
//   })

//   // request拦截器
//   install.interceptors.request.use(config => {
//     // Do something before request is sent
//       config.headers.Authorization = window.sessionStorage.getItem('token')
//       return config
//   }, error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   })

//   return install(config)
// }