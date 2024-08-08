import moment from 'moment'
/**
 * @description 获取浏览器默认语言
 * @returns {string}
 */
export function getBrowserLang() {
  const browserLanguage = (navigator as any).browserLanguage
  const browserLang = navigator.language ? navigator.language : browserLanguage
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase()))
    defaultBrowserLang = 'zh'
  else
    defaultBrowserLang = 'en'

  return defaultBrowserLang
}

/**
 * 创建唯一字符串
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = `${+new Date()}`
  const randomNum = `${Number.parseInt(String((1 + Math.random()) * 65536))}`
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 创建唯一的traceId（web-毫秒时间戳-6位随机字符）
 * @returns {string}
 */
export function createUniqueTraceId() {
  const timestamp = `${+new Date()}`
  const randomString = createUniqueString().substring(0, 6)
  return `web-${timestamp}-${randomString}`
}

// 封装公共js调用app方法
export function js_sync_app(type: string, params: any, name: string) {
  console.log(type, params, name, 'js_')
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Native) {
    window.webkit.messageHandlers.Native.postMessage(
      JSON.stringify({
        type,
        params,
      }),
    )
  }
  else if (window.Native) {
    console.log('window.Native >', window.Native)
    window.Native[type](params[name])
  }
  else if (window.chrome?.webview?.hostObjects?.dataObj) {
    const chromeDataObj = window.chrome.webview.hostObjects.dataObj
    chromeDataObj[type](params[name])
  }
  else if (window.dataObj) {
    window.dataObj[type](params[name])
  }
  else if (window.wx && window.wx.miniProgram) {
    window.wx.miniProgram.postMessage({ data: { type, params } })
  }
}

// 判断是否是PC端
export function isPc() {
  if (window.chrome?.webview?.hostObjects?.dataObj || window.dataObj)
    return true

  return false
}

// 判断是否是ios
export function isIosFun() {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isAndroid = u.includes('Android') || u.includes('Adr') // android终端
  let flag = false
  if (isiOS)
    flag = true
  else if (isAndroid)
    flag = false

  return flag
}

/**
 * 判断当前设备是否为 Android 设备
 *
 * @returns {boolean} 如果是 Android 设备则返回 true，否则返回 false
 */
export function isAndroidFun() {
  const userAgent = navigator.userAgent
  const isAndroid = userAgent.includes('Android') || userAgent.includes('Adr')

  return isAndroid
}

// 是否是 iphonex 型号 X XS, XS Max, XR
export function isIphonex() {
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
  ]
  const u = navigator.userAgent
  const IS_IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  // h5
  if (typeof window !== 'undefined' && window) {
    if (!IS_IOS)
      return false

    const { devicePixelRatio, screen } = window
    const { width, height } = screen
    return xSeriesConfig.some(
      item =>
        item.devicePixelRatio === devicePixelRatio
        && item.width === width
        && item.height === height,
    )
  }
  return false
}

/**
 * 获取OSS资源路径
 * @param url 资源路径
 * @returns {string}
 */
export function getOSSUrl(url = '') {
  let newUrl = decodeURIComponent(url)
  newUrl = newUrl.trim().replace(/\s/g, '') // PC不支持ES12API

  if (!/^(f|ht)tps?:\/\//i.test(newUrl))
    return `${import.meta.env.VITE_CDN_URL}/${newUrl}`

  return newUrl
}

// 判断输入的url是否为相对路径
export function prependHttpIfMissing(url) {
  let trimmedUrl = String(url).trim()
  // 兼容以"/"开头的字符串
  if (trimmedUrl.startsWith('/'))
    trimmedUrl = trimmedUrl.slice(1)

  // 检查trimmedUrl是否以http://或https://开头
  if (!/^https?:\/\//i.test(trimmedUrl))
    return `${import.meta.env.VITE_CDN_URL}/${trimmedUrl}`

  return trimmedUrl
}

// 封装公共js调用app方法，H5页面加载完毕
export function js_sync_loadEnd(type = 'js_sync_loadEnd', params: any = { type: 'loadEnd' }, name = 'type') {
  // android设备才需要执行该方法
  if (isAndroidFun()) {
    // 由于PC客户端是模拟的安卓设备，调用window.dataObj会报错，这里单独做处理
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Native) {
      window.webkit.messageHandlers.Native.postMessage(
        JSON.stringify({
          type,
          params,
        }),
      )
    }
    else if (window.Native) {
      window.Native[type](params[name])
    }
  }
}

// 封装公共js调用app 分享方法
export function js_sync_share(type: string = 'js_sync_share', params: any, name: string = 'share') {
  js_sync_app(type, params, name)
}

// 封装公共js调用app方法，H5页面返回
export function js_sync_back(type: string = 'js_sync_back', params: any = { type: 'back' }, name: string = 'type') {
  type = isIosFun() ? 'js_sync_back' : 'js_app_back'
  js_sync_app(type, params, name)
}

// 格式化时间
export function timeFormat(val: number, format = 'YYYY-MM-DD HH:mm:ss', boolean: boolean) {
  if (boolean)
    return moment.unix(val).format(format)
  else
    return moment(val).format(format)
}

// 防抖
export function debounce(fun: Function, time: number) {
  let timer: number
  return function () {
    const _this = this
    const arr = arguments
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fun.call(_this, ...arr)
    }, time)
  }
}

// 节流
export function throttle(fn: Function, delay: number) {
  let prevTime = Date.now()
  return function () {
    // 第二次点击时间 - 第一次 > delay
    if (Date.now() - prevTime > delay) {
      fn.apply(this, arguments)
      prevTime = Date.now()
    }
  }
}
