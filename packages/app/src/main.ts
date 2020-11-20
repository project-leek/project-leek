import { createApp } from 'vue';

import { socket as feathersSocket } from '@/lib/feathers';

import './assets/css/tailwind.css';

import App from './App.vue';
import './index.css';

createApp(App).mount('#app');

feathersSocket.open();
