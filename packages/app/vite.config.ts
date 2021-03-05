import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [vue(), WindiCSS()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        ws: true,
      },
      '/oauth': {
        target: 'http://localhost:3030',
      },
    },
  },
});
