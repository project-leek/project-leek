module.exports = {
  extends: ['../../config/.eslintrc.base.js'],

  env: {
    es6: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    // ecmaVersion: 2018,
    // sourceType: 'module'
  },
};
