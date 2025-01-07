import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': 'src',
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'popup.html',
        content: 'src/content.ts',
      },
      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        manualChunks(id, chunkMeta) {
          if (id.endsWith('src/content.ts')) {
            console.log(id, chunkMeta.getModuleInfo(id))
            return 'content'
          }
        },
        entryFileNames(chunkInfo) {
          if (['content'].includes(chunkInfo.name)) {
            return '[name].js'
          }
          return 'js/[name]-[hash].js'
        },
        name: '[name].js',
      },
      // plugins: [
      //   {
      //     name: 'rm-content-last-export',
      //     generateBundle(_options, bundle) {
      //       const content = bundle['content.js'] as any
      //       if (content && content.code) {
      //         content.code = content.code.replace(/export[^;]+;/, '')
      //       }
      //     },
      //   },
      // ],
    },
  },
})
