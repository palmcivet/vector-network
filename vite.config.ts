import { defineConfig } from 'vite';
import path from 'path';
import solid from 'vite-plugin-solid';
import unoCSS from 'unocss/vite';

import { version, repository } from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __APP_GITHUB__: JSON.stringify(repository.url),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [unoCSS(), solid()],
});
