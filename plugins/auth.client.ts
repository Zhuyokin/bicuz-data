import { useUserStore } from '@/store'

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const userStore = useUserStore()
  let token = route.query.token as string
  console.log('[ url中的token ] >', token)
  if (Array.isArray(token) && token) {
    // token中的+号会丢失，这里将token中的空格转换成+号
    token[0] = token[0].replace(/\s/g, '+')
    userStore.setToken(token[0])
  }
  else if (token) {
    // token中的+号会丢失，这里将token中的空格转换成+号
    token = token.replace(/\s/g, '+')
    userStore.setToken(token)
  }
})
