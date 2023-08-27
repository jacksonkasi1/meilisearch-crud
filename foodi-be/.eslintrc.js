module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": "error",
    semi: ["error", "always"],
    quotes: ["error", "single"],
    eqeqeq: "error",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 2 }],
    indent: ["error", 4],
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-extra-semi": "error",
    camelcase: "off",
    "no-prototype-builtins": "off",
  },
};
