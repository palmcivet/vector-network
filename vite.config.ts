import { defineConfig } from 'vite';
import path from 'path';
import solid from 'vite-plugin-solid';
import unoCSS from 'unocss/vite';

import { version } from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [unoCSS(), solid()],
});
