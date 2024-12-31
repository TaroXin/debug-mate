import { defineStore } from 'pinia'
import { getCurrentOrigin } from '../utils/settings.ts'

export const useSystemStore = defineStore('system', () => {
  const isDark = ref(false)
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
