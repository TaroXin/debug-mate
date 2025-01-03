import nodeResolve from '@rollup/plugin-node-resolve'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue-demi', '@debug-mate/core'],
    },
    lib: {
      entry: './lib/main.ts',
      name: 'DebugMateVue',
      fileName: 'debug-mate-vue',
    },
  },
  plugins: [
    nodeResolve(),
    dts(),
  ],
})
