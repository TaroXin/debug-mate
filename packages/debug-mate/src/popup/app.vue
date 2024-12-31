<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { useSystemStore } from '../store/system.ts'

const systemStore = useSystemStore()
</script>

<template>
  <n-config-provider inline-theme-disabled :theme="systemStore.isDark ? darkTheme : undefined">
    <n-modal-provider>
      <n-message-provider>
        <n-dialog-provider>
          <div h-400 w-600>
            <n-layout position="absolute">
              <n-layout-header bordered>
                <popup-nav-bar />
              </n-layout-header>
              <n-layout has-sider position="absolute" style="top: 41px">
                <n-layout-sider :collapsed="true" collapse-mode="width" bordered>
                  1234
                </n-layout-sider>
                <RouterView />
              </n-layout>
            </n-layout>
          </div>
        </n-dialog-provider>
      </n-message-provider>
    </n-modal-provider>

    <n-global-style />
  </n-config-provider>
</template>

<style scoped lang="scss">
</style>
