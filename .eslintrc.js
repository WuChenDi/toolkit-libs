module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  extends: ['plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
  },

  rules: {
    'no-undef': 'error',
    eqeqeq: 'error',
    'no-console': 'error',
  },
}
