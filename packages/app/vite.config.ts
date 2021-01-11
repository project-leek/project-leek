import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        ws: true,
      },
    },
  },

  optimizeDeps: {
    exclude: ['@fortawesome/fontawesome-free'],
  },
});
