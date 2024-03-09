module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@typescript-eslint/strict-type-checked",
    "prettier",
  ],
  rules: {
    complexity: ["error", 3],
    "max-depth": ["error", { max: 3 }],
    "max-len": ["error", { code: 120, ignorePattern: "^import", ignoreUrls: true }],
    "no-extra-parens": ["off"],
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
};
