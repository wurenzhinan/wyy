// 封装axios
// 实例化 请求拦截器 响应拦截器

import axios from 'axios'
const http = axios.create({
  baseURL: ' http://121.40.19.111:3000',
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 由于打印loginStore里面的res.data里面还有一个data,
  // 所以在原来返回response的基础上返回response.data
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
})

export { http }