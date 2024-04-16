import { defineConfig } from 'unocss';
import { presetUno } from 'unocss/preset-uno';

export default defineConfig({
  shortcuts: {
    'sc-container': 'w-full',
    'sc-container-inner':
      'm-auto w-full sm:w-[360px] md:w-[512px] lg:w-[768px] xl:w-[1024px]',
  },
  theme: {
    breakpoints: {
      sm: '360px',
      md: '512px',
      lg: '768px',
      xl: '1024px',
    },
  },
  presets: [presetUno()],
});
