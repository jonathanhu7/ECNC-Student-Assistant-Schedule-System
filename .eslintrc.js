module.exports = {
  // 指定了代码的运行环境
  env: {
    browser: true, // 指定了代码将在浏览器中运行
    es2021: true, // 使用的是 ES2021 的语言特性，ES2021 是 JavaScript 语言标准中的一个版本
  },
  // extends 指定一组规则集，Eslint 根据这些规则来检查代码
  extends: [
    "love", // 使用 eslint-config-love 的配置文件
    "plugin:react/recommended", // 推荐的 react 的规则集
    "prettier", // Prettier 代码格式化工具的规则集
  ],
  // overrides 允许针对特定文件定义或覆盖上述规则
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
    sourceType: "module",
  },
  plugins: ["react"],
  "rules": {
    "@typescript-eslint/no-misused-promises": [2, {
      "checksVoidReturn": {
        "attributes": false
      }
    }]
  },
  settings: { react: { version: "detect" } },
  ignorePatterns: ["next-env.d.ts"],
};
