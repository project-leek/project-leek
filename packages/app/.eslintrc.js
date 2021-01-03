module.exports = {
  extends: [],

  env: {
    es6: true,
    node: true,
    node: true,
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },

  extends: [
    '../../config/.eslintrc.base.js',

    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],

  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 150 }],
    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      },
    ],
  },

  overrides: [
    {
      files: ['*.vue', '*.js'],
      rules: {
        'max-len': 'off', // disables line length check
      },
    },
  ],
};
