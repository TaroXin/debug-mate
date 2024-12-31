import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        iconPark: () => import('@iconify-json/icon-park-outline/icons.json').then(i => i.default),
      },
    }),
  ],
})
