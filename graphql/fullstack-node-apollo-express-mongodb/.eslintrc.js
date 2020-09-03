module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "indent": [
      "error", 2,
    ],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "quotes": [
      "error",
      "double",
    ],
    "semi": [
      "error",
      "always",
    ],
  },
};
