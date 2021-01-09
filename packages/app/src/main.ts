import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';
import '../index.css';
import 'typeface-roboto';
import 'typeface-baloo';

import { createApp } from 'vue';

import App from './App.vue';
import { socket as feathersSocket } from './lib/feathers';
import router from './router';

createApp(App).use(router).mount('#app');

feathersSocket.open();
