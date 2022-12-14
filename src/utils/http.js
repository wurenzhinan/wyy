

import axios from 'axios'
const http = axios.create({
  baseURL: ' http://121.40.19.111:3000',
  timeout: 5000
})
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.dir(error)
})

export { http }