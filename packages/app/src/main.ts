import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import test from './test';

function printIt(str: number) {
  // eslint-disable-next-line no-console
  console.log(str);
}

printIt(test.text);

createApp(App).mount('#app');
