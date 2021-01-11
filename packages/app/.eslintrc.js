module.exports = {
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
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
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
    'vue/attribute-hyphenation': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'prettier/prettier': 'error',
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
