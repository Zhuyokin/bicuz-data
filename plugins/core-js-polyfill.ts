import { cloneDeep } from 'lodash'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (typeof globalThis.structuredClone === 'undefined') {
    globalThis.structuredClone = (obj) => {
      return cloneDeep(obj)
    }
  }
})
