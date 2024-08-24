/**
 * 替换url中的多个问号为一个
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const originalUrl = to.fullPath
  const firstQuestionMarkIndex = originalUrl.indexOf('?')

  if (firstQuestionMarkIndex !== -1) {
    const queryPart = originalUrl.slice(firstQuestionMarkIndex + 1)
    const additionalQuestionMarkIndex = queryPart.indexOf('?')

    if (additionalQuestionMarkIndex !== -1) {
      const cleanQueryPart = queryPart.replace(/\?/g, '&')
      const newUrl = `${originalUrl.slice(0, firstQuestionMarkIndex + 1)}${cleanQueryPart}`

      // 使用 navigateTo 进行重定向
      return navigateTo(newUrl, { redirectCode: 301 })
    }
  }
})
