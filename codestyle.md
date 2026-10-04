本代码规范参考自：Airbnb JavaScript Style Guide 及 Vue.js Official Style Guide（https://github.com/airbnb/javascript 、https://vuejs.org/style-guide/）

# 前端代码规范（Vue 3 / JavaScript）

本仓库代码遵循 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
与 [Vue.js 官方风格指南](https://vuejs.org/style-guide/)，并结合项目实践做如下约定。

## 1. 变量与函数

- 使用 `const` / `let`，**禁止**使用 `var`。
- 回调函数使用箭头函数。
- 函数名、变量名使用 `camelCase`（如 `fetchHistory`）。
- 常量使用 `UPPER_SNAKE_CASE`（如 `ALLOWED_PATTERN`）。

## 2. 命名与文件

- 组件命名使用 `PascalCase`（如 `Calculator.vue`）。
- 普通 JS 文件命名使用 `kebab-case` / 小写（如 `keyMapping.js`
  按需求文档指定命名）。
- Vue 组件优先使用 `<script setup>` 组合式 API。

## 3. 组件约定

- 每个组件必须有清晰的 `props` 与 `emits` 定义。
- 使用 `defineProps` / `defineEmits` 显式声明接口与类型。
- 组件样式使用 `<style scoped>` 隔离，全局变量定义在 `:root`。

## 4. API 请求

- 统一使用 `src/api/index.js` 封装的 Axios 实例，禁止在组件内
  直接使用裸 `axios`。
- 环境相关配置通过 `VITE_` 前缀环境变量注入。

## 5. 格式

- 使用 2 个空格缩进。
- 语句结尾使用分号。
- 字符串使用单引号。
- 对象、数组末尾保留尾随逗号（多行时）。
- 每行不超过 100 个字符。

## 6. 安全

- 前端**不执行**任何表达式计算，全部交由后端处理。
- **禁止**在前端使用 `eval` / `new Function` 处理用户输入。
- 用户可见的错误优先使用明确的文案，网络/服务器错误分别提示。
