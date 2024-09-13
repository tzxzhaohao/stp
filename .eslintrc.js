module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // 全局变量
  globals: {
    defineOptions: 'readonly',
    env: false,
    JsPDF: false,
    ENV: false,
    echarts: false,
    lottie: false,
    Highcharts: false,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: ['that', '_this'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
}
