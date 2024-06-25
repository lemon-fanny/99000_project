import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log('Request config:', config) // 添加日志输出

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.error('Request error:', error) // 添加日志输出
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log('Response:', response) // 添加日志输出
    const res = response.data

    // 判断自定义状态码
    if (res.code !== 20000 && res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.error('Response error:', error) // 添加日志输出
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Error response data:', error.response.data) // 添加详细错误响应日志输出
      console.error('Error response status:', error.response.status)
      console.error('Error response headers:', error.response.headers)
      Message({
        message: error.response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      // 一些错误发生在设置请求时触发
      console.error('Error message:', error.message)
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
