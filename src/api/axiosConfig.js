import axios from 'axios';
import config from '../config'
import { getToken } from '@/utils/message.js'
import { MESSAGE, LOGONOUT } from 'application-message-plus'
console.log(config, import.meta.env)
var Axios = axios.create({
  baseURL: config.baseApi,
  timeout: 10000,
});
let count = 0;
// 添加请求拦截器
Axios.interceptors.request.use(async function (config) {
  const token = await getToken()
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  config.headers['appSrc'] = 1;
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
Axios.interceptors.response.use(function (res) {
  if (res.data.code === 1 || res.data.code == 200) {
    count = 0
    return Promise.resolve(res)
  } else if (res.data.code == 2 || res.data.code == 40100000) {
    setTimeout(breakMessage(res.data.msg), 1)
    return Promise.reject(res.data.data)
  } else {
    MESSAGE({
      type: 'error',
      message: res.data.msg
    })
    return Promise.reject(res.data.data)
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    MESSAGE({
      type: 'error',
      message: '请求超时，请稍后重试'
    })
  } else {
    MESSAGE({
      type: 'error',
      message: '请求出错，请稍后重试'
    })
  }
  return Promise.reject(error);
});

function breakMessage(msg) {
  if (!count) {
    logout();
    count = 1
  }
}
//退出
function logout() {
  // await store.dispatch('login/logout')
  // router.push(`/login?redirect=${router.history.current.fullPath}`)
  LOGONOUT({ 
    message: '登录信息已过期，请重新登录'
  })
}
export default Axios