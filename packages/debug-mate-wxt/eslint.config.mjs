import { antfu } from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  unocss: true,
  vue: {
    overrides: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
    },
  },
})
