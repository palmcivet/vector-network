import { defineConfig } from 'vite';
import path from 'path';
import solid from 'vite-plugin-solid';
import unoCSS from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [unoCSS(), solid()],
});
