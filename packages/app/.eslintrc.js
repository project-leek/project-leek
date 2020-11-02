module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',

    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',

    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',

    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
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
