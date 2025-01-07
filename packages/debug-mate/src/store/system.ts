import { defineStore } from 'pinia'
import { getCurrentOrigin } from '../utils/settings.ts'

export const useSystemStore = defineStore('system', () => {
  const isDark = ref(true)
  const origin = ref<string>('')

  const encodedOrigin = computed(() => {
    return encodeURIComponent(origin.value)
  })

  getCurrentOrigin().then((value) => {
    if (value) {
      origin.value = value
    }
  })

  return {
    isDark,
    origin,
    encodedOrigin,
  }
}, {
  persist: {
    omit: ['origin'],
  },
})
