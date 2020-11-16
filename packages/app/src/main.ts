import { createApp } from 'vue';

import { init as feathersInit } from '@/lib/feathers';

import App from './App.vue';
import './index.css';

createApp(App).mount('#app');

feathersInit();
