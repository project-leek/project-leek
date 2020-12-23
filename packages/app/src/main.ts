import { createApp } from 'vue';

import { socket as feathersSocket } from './lib/feathers';
import App from './App.vue';
import router from './router';

import '../index.css';
import 'typeface-roboto';
import 'typeface-baloo';

createApp(App).use(router).mount('#app');

feathersSocket.open();
