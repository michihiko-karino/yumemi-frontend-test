import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/yumemi-frontend-test/',
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
});
