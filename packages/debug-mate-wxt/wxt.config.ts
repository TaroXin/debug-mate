import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/unocss'],
  runner: {
    disabled: true,
  },
  imports: {
    imports: [
      { name: '*', as: 'types', from: '@debug-mate/types' },
    ],
  },
  manifest: {
    name: 'DebugMate',
    icons: {
      16: '/icon/icon@16.png',
      48: '/icon/icon@48.png',
      128: '/icon/icon@128.png',
    },
    permissions: [
      'storage',
      'activeTab',
    ],
    web_accessible_resources: [
      {
        resources: ['/lib/inject.js'],
        matches: ['<all_urls>'],
      },
    ],
  },
  vite: (_env) => {
    return {
      plugins: [
        Components({
          dts: true,
          dirs: ['./components'],
          resolvers: [
            NaiveUiResolver(),
          ],
        }) as any,
      ],
    }
  },
})
