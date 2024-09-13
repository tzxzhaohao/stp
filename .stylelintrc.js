module.exports = {
  processors: [],
  plugins: [],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-recommended-vue/scss', 'stylelint-config-recess-order'],
  rules: {
    indentation: 4,
    'font-family-no-missing-generic-family-keyword': null,
    'number-leading-zero': 'never',
    'color-named': 'never',
    'color-hex-length': 'short',
    'declaration-colon-space-after': 'always',
    'no-invalid-position-at-import-rule': null,
    'number-leading-zero': null,
    'color-named': null,
    'import-notation': 'string',
    'color-function-notation': 'legacy',
    'alpha-value-notation': null,
    'custom-property-empty-line-before': null,
    'color-hex-length': null,
    'no-duplicate-selectors': null,
    'value-keyword-case': null,
    'order/properties-order': null,
  }, // 可以自己自定一些规则
}
