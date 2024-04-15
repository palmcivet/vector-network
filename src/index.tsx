import { render } from 'solid-js/web';
import { App } from '@/app';

import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';
import '@/styles/index.less';

const root = document.getElementById('root');

render(() => <App />, root!);
