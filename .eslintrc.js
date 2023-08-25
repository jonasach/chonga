module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next'
  ],
  rules: {
    "no-unused-vars": "warn", // instead of "error"
  }
  
};
