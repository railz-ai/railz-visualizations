module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'react-app',
    ],
    env: {
      node: true,
      jest: true,
    },
    rules: {
      'max-len': [2, { code: 100 }],
      'no-empty': ['warn', { allowEmptyCatch: true }], // default is false
      '@typescript-eslint/no-unused-vars': 'error', // default is warn
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
          'newlines-between': 'always-and-inside-groups',
        },
      ],
    },
  };
  