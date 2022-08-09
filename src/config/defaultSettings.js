/**
 * 项目默认配置项
 * whiteOrigin - 通信白名单域名
 * developerModel - 开发模式 ['single', 'embedded'] 两种模式 'single' 模式开启完整 layout 布局开发
*/
const SINGLE = 'single'
const EMBEDDED = 'embedded'
const WHITE_ORIGIN = import.meta.env.VITE_APP_iframeUrl

export default {
    whiteOrigin: WHITE_ORIGIN,
    developerModel: window.self === window.top ? SINGLE : EMBEDDED // 动态设置模式
}


export { SINGLE, EMBEDDED }