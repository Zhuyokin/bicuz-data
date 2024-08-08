// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  antfu(
    {
      unocss: true,
      formatters: true,
    },
    {
      rules: {
        'no-console': 'off',
        'ts/no-namespace': 'off',
        'ts/no-var-requires': 'off',
        'ts/no-require-imports': 'off',
        'unused-imports/no-unused-vars': 'warn',
        'antfu/top-level-function': 'off',
        'if-newline': 'off',
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
      },
    },
  ),
)
