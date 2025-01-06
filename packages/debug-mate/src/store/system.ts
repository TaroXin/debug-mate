import { defineStore } from 'pinia'
import { getCurrentOrigin } from '../utils/settings.ts'

export const useSystemStore = defineStore('system', () => {
  const isDark = ref(true)
  const origin = ref<string | undefined>()

  getCurrentOrigin().then((value) => {
    origin.value = value
  })

  return {
    isDark,
    origin,
  }
}, {
  persist: {
    omit: ['origin'],
  },
})
