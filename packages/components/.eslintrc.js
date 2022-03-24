module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@stencil/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': [2, { code: 160 }],
    'no-empty': ['warn', { allowEmptyCatch: true }], // default is false
    '@typescript-eslint/no-unused-vars': 'error', // default is warn
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@stencil/async-methods': 'error',
    '@stencil/ban-prefix': ['error', ['stencil', 'stnl', 'st']],
    '@stencil/decorators-context': 'error',
    '@stencil/decorators-style': [
      'error',
      {
        prop: 'inline',
        state: 'inline',
        element: 'inline',
        event: 'inline',
        method: 'multiline',
        watch: 'multiline',
        listen: 'multiline',
      },
    ],
    '@stencil/element-type': 'error',
    '@stencil/host-data-deprecated': 'error',
    '@stencil/methods-must-be-public': 'error',
    '@stencil/no-unused-watch': 'error',
    '@stencil/own-methods-must-be-private': 'error',
    '@stencil/own-props-must-be-private': 'error',
    '@stencil/prefer-vdom-listener': 'error',
    '@stencil/props-must-be-public': 'error',
    '@stencil/props-must-be-readonly': 'error',
    '@stencil/render-returns-host': 'error',
    '@stencil/required-jsdoc': 'off',
    '@stencil/reserved-member-names': 'error',
    '@stencil/single-export': 'error',
    '@stencil/strict-mutable': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
  },
  settings: {
    'import/core-modules': ['@stencil/core/testing'],
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
