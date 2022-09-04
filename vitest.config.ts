/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    deps: {
      // vitest上のjsdomでcanvasを扱えるようにする
      inline: ['vitest-canvas-mock'],
    },
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
