# studentID_calculator_frontend

## 1. Project Introduction

This repository is the **front end** of the "front-end / back-end
separated calculator system". It is responsible for:

- providing the calculator interface (button clicks + keyboard input);
- sending expressions to the backend `POST /api/calculate` via Axios;
- showing the result returned by the backend and refreshing the history
  panel;
- showing errors with a browser-native `alert()`.

**Core constraint**: the front end performs no mathematical calculation;
results come entirely from the backend.

## 2. Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Vue 3 (Composition API + `<script setup>`) | ^3.4.38 |
| Build tool | Vite | ^5.4.2 |
| State management | Pinia | ^2.2.2 |
| HTTP client | Axios | ^1.7.2 |
| Testing | Vitest + @vue/test-utils + jsdom | ^2.0.5 |
| Styling | Native CSS (CSS variables) | - |

## 3. Runtime Environment

- Node.js 18 or newer (development used v24)
- npm (installed with Node)

## 4. Installation Method

```bash
cd studentID_calculator_frontend
npm install
```

## 5. Startup Method

### Development mode

```bash
npm run dev
```

Open `http://localhost:5173` in a browser.

> Make sure the backend is running on `http://localhost:5000` (or change
> `VITE_API_BASE_URL` in `.env` to point to your backend).

### Production build and preview

```bash
npm run build
npm run preview
```

## 6. Configuration Instructions

Copy `.env.example` to `.env` and adjust the backend address as needed:

```
VITE_API_BASE_URL=http://localhost:5000
```

If it is not set, the code falls back to `http://localhost:5000`. Every
environment variable prefixed with `VITE_` is injected into the front-end
code.

## 7. Database Initialization Method

The front end **does not use a database**. All calculation history is
stored in SQLite by the backend; the front end only reads and deletes it
through the API. Database auto-creation is described in the backend
README.

## 8. Front-end/Back-end Connection Method

The backend API baseURL is configured in one place in the front end, in
**`src/api/index.js`**:

```js
const baseURL = import.meta.env.VITE_API_BASE_URL
  || 'http://localhost:5000';
```

There are two ways to change it:

1. **Environment variable** (recommended): set `VITE_API_BASE_URL` in the
   `.env` file at the project root;
2. **Code default**: edit the fallback address in `src/api/index.js`.

CORS is enabled on the backend, so during development the front end can
call the backend across ports without configuring a proxy.

## 9. Project Structure

```
studentID_calculator_frontend/
├── src/
│   ├── api/
│   │   └── index.js              # Axios instance and API wrappers
│   ├── components/
│   │   ├── Calculator.vue        # Calculator interface
│   │   └── HistoryPanel.vue      # History panel
│   ├── store/
│   │   └── calculator.js         # Pinia state management
│   ├── utils/
│   │   └── keyMapping.js         # Keyboard shortcuts (reserved)
│   ├── App.vue                   # Root component
│   └── main.js                   # Entry file
├── public/
│   ├── favicon.svg
│   └── theme.json                # Theme variables (reserved)
├── tests/
│   ├── store.spec.js             # State management tests
│   └── calculator.spec.js        # Component tests
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── README.md
└── codestyle.md
```

## Testing

```bash
npm run test
```

## Deployment

1. Set `VITE_API_BASE_URL` in `.env` (or the platform's environment
   variables) to the backend's public address;
2. Run `npm run build`; the output is in `dist/`;
3. Deploy `dist/` to an Nginx static directory, Vercel or Netlify;
4. If using Nginx, you can reverse-proxy `/api/` to the backend (see
   `nginx.conf` in the backend repository) or rely on the backend's CORS.
