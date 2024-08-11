/** @type {import('eslint').Linter.FlatConfig} */
const config = {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
      }
    },
    extends: ['eslint:recommended'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  };
  
  module.exports = config;
  