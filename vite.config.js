import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// Vite + Vitest configuration. The backend address is configured at
// runtime through the VITE_API_BASE_URL environment variable.
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
