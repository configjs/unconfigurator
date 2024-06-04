// @ts-check

const antfu = require('@antfu/eslint-config')

module.exports = antfu.default({
  rules: {
    'no-console': 'off',
    'ts/no-namespace': 'off',
    'style/max-statements-per-line': 'off',
  },
  ignores: [
    'auto-imports.d.ts',
    'components.d.ts',
  ],
})
