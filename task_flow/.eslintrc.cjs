module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,  // Asegúrate de que esto es un número, no una cadena
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // tus reglas personalizadas
  }
};
