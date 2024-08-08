export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // 处理错误，例如上报到一个服务
    console.log('[ error ] >', error)
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    //
    console.log('[ error ] >', error)
  })
})
