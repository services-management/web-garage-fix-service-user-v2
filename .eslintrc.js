module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn"],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
