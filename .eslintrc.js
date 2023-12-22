module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
  ignorePatterns: ['public/**/*.js', 'dev-dist/*.js'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@utils', './src/utils'],
          ['@images', './src/assets/images'],
        ],
        extensions: ['.js', '.vue', '.json', '.ts'],
      },
    },
  },
};
