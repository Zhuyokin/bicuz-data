import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (typeof globalThis.structuredClone === 'undefined') {
    globalThis.structuredClone = (obj) => {
      return useCloneDeep(obj)
    }
  }
})
