# studentID_calculator_frontend

## 1. 项目简介（Project Introduction）

本项目是「前后端分离计算器系统」的**前端**。它负责：

- 提供计算器界面（按钮点击 + 键盘输入）；
- 通过 Axios 将表达式发送到后端 `POST /api/calculate`；
- 展示后端返回的结果，并刷新历史记录面板；
- 出现错误时使用浏览器原生 `alert()` 提示。

**核心约束**：前端不进行任何数学计算，结果完全来自后端。

## 2. 技术栈（Technology Stack）

| 组件 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3（Composition API + `<script setup>`） | ^3.4.38 |
| 构建工具 | Vite | ^5.4.2 |
| 状态管理 | Pinia | ^2.2.2 |
| HTTP 客户端 | Axios | ^1.7.2 |
| 测试 | Vitest + @vue/test-utils + jsdom | ^2.0.5 |
| 样式 | 原生 CSS（CSS 变量） | — |

## 3. 运行环境（Runtime Environment）

- Node.js 18 及以上（开发环境使用 v24）
- npm（随 Node 安装）

## 4. 安装方法（Installation Method）

```bash
cd studentID_calculator_frontend
npm install
```

## 5. 启动方法（Startup Method）

### 开发模式

```bash
npm run dev
```

浏览器访问 `http://localhost:5173`。

> 请确保后端已在 `http://localhost:5000` 运行（或修改 `.env`
> 中的 `VITE_API_BASE_URL` 指向你的后端地址）。

### 生产构建与预览

```bash
npm run build
npm run preview
```

## 6. 配置说明（Configuration Instructions）

复制 `.env.example` 为 `.env`，按需修改后端地址：

```
VITE_API_BASE_URL=http://localhost:5000
```

若未设置，代码会默认使用 `http://localhost:5000`。Vite 中所有
以 `VITE_` 开头的环境变量都会注入到前端代码中。

## 7. 数据库初始化方法（Database Initialization Method）

前端**不涉及数据库**。所有计算历史均由后端保存到 SQLite，
前端只通过 API 读取与删除。数据库的自动创建见后端 README。

## 8. 前端/后端连接方法（Front-end/Back-end Connection Method）

后端 API 的 baseURL 在前端集中配置于 **`src/api/index.js`**：

```js
const baseURL = import.meta.env.VITE_API_BASE_URL
  || 'http://localhost:5000';
```

修改方式有两种：

1. **环境变量**（推荐）：在项目根目录 `.env` 中设置
   `VITE_API_BASE_URL`；
2. **代码默认值**：直接修改 `src/api/index.js` 中的回退地址。

后端已开启 CORS，因此开发时前端可直接跨端口访问，无需配置代理。

## 9. 项目目录结构（Project Structure）

```
studentID_calculator_frontend/
├── src/
│   ├── api/
│   │   └── index.js              # Axios 实例与 API 封装
│   ├── components/
│   │   ├── Calculator.vue        # 计算器主界面
│   │   └── HistoryPanel.vue      # 历史记录面板
│   ├── store/
│   │   └── calculator.js         # Pinia 状态管理
│   ├── utils/
│   │   └── keyMapping.js         # 键盘快捷键（预留）
│   ├── App.vue                   # 根组件
│   └── main.js                   # 入口文件
├── public/
│   ├── favicon.svg
│   └── theme.json                # 主题变量（预留）
├── tests/
│   ├── store.spec.js             # 状态管理测试
│   └── calculator.spec.js        # 组件测试
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── README.md
└── codestyle.md
```

## 测试方法

```bash
npm run test
```

## 部署说明

1. 在 `.env`（或部署平台的环境变量）中把 `VITE_API_BASE_URL`
   设置为后端公网地址；
2. 执行 `npm run build`，产物位于 `dist/`；
3. 将 `dist/` 部署到 Nginx 静态目录、Vercel 或 Netlify；
4. 若使用 Nginx，可让 `/api/` 反向代理到后端（见后端仓库
   `nginx.conf`），也可依赖后端已开启的 CORS。
