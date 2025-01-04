<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import routes from '@/popup/router/routes.ts'

const menus: MenuOption[] = routes.map((route) => {
  return {
    label: route.meta?.title,
    key: route.path,
    icon: () => h('div', { class: route.meta?.icon }),
  }
})

const activeMenu = ref('/')
</script>

<template>
  <n-menu
    v-model:value="activeMenu"
    :options="menus"
    :collapsed-width="48"
    @update-value="(value) => $router.push(value)"
  />
</template>

<style scoped lang="scss">

</style>
