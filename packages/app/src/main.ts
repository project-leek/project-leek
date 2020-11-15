import { createApp } from 'vue';

import { init as feathersInit } from '@/lib/feathers';
import './index.css';
import App from './App.vue';

createApp(App).mount('#app');

feathersInit();
