module.exports = {
  env: {
    node: true,
    browser: true,
    jest: true,
    serviceworker: true,
  },
  ignorePatterns: ['dist', '.*.js', '*.config.js', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'plugin:import/typescript',

    'plugin:prettier/recommended'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: [
      'error',
      'always'
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    'import/no-extraneous-dependencies': ['error'],
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        // project: 'packages/*/tsconfig.json',
        alwaysTryTypes: true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    }
  }
};
