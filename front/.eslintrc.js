module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    // "plugin:vue/essential",
    // '@nuxtjs',
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "prettier/prettier": "error",
  },
};
