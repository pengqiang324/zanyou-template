import { userInfo } from '@/store/modules/userInfo'
import config from '@/config/defaultSettings'


/**
 * 推送消息
 * @author pengqiang
 * @Date 2021/07/12 15:34
 * @params {String} type 推送消息类型
 * @params {Object} data 推送消息数据
 * @params {String} origin 推送目标网址
 */
 export const postMessage = ({ type, data={}, origin=config.whiteOrigin }) => {
    if (!window.parent) return
    window.parent.postMessage({
        type,
        data,
      }, origin)
}


/**
 * 接收消息回调
 * @author pengqiang
 * @Date 2021/07/13 09:23
 */
export const reciveMessage = (event) => {
  // 只针对规定白名单域名做处理
  if (event.origin !== config.whiteOrigin) return
  const userInfoStore = userInfo()
  const { token } = event.data
  userInfoStore.SetToken(token)
  window.Resolves.forEach(fn => {
    fn.r(token)
  })
  window.removeEventListener('message', reciveMessage)
  window.Resolves = null // 清空请求执行栈 垃圾回收
}

/**
 * 异步等待 获取 token 值
 * @author pengqiang
 * @Date 2021/07/13 09:23
 */
window.Resolves = [] // 初始化请求执行栈
export const getToken = () => {
  return new Promise((resolve) => {
      if (window.Resolves) window.Resolves.push({ r: resolve })
      const userInfoStore = userInfo()
      const TOKEN = userInfoStore.token
      if (!TOKEN) {
        if (config.developerModel === 'single') {
          // 正常登录过去 token
          resolve('单点登录')
        } else {
          // 监听主应用传过来的 token 值
          window.addEventListener('message', reciveMessage, false)
        }
      } else {
        window.Resolves = null // 垃圾回收 内存释放
        resolve(TOKEN)
      }
  })
}

/**
 * 解绑事件
 * @author pengqiang
 * @date 2021/07/13 09:29
 * @params {String} eventName 事件名称
 * @params {Function} eventFunc 事件回调
 */
export const removeEvent = (eventName, eventFunc) => {
    window.removeEventListener(eventName, eventFunc)
    window.eventFunc = null
}

/**
 * 绑定事件
 * @author pengqiang
 * @Date 2021/07/16 11:29
 * @params {String} eventName 事件名称
 * @params {Function} eventFunc 事件回调
 * @params {Boolean|Object} useCapture 指定移除事件句柄的阶段
 */
 export const addEvent = (eventName, eventFunc, useCapture={ once: true }) => {
    window.eventFunc = eventFunc
    window.addEventListener(eventName, messageCallback, useCapture)
  }

  const messageCallback = function(event) {
    if (event.origin !== config.whiteOrigin) return
    window.eventFunc && window.eventFunc(event.data)
  }