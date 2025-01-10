<script setup lang="ts">
import { useSystemStore } from '@/store/system'

const systemStore = useSystemStore()
</script>

<template>
  <div flex="~ justify-between items-center" h-40 p-x-10>
    <div flex="~ items-center gap-5">
      <span font-700>DEBUG MATE</span>
      <span opacity-50>({{ systemStore.origin }})</span>
    </div>

    <div
      v-if="systemStore.isDark"
      i-icon-park-outline-sun
      text-25
      @click="systemStore.isDark = !systemStore.isDark"
    />
    <div
      v-else
      i-icon-park-outline-moon
      text-22
      @click="systemStore.isDark = !systemStore.isDark"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
