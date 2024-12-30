import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    copy({
      targets: [
        { src: 'manifest.json', dest: 'dist' },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'popup.html',
      },
      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        name: '[name].js',
      },
    },
  },
})
