import { createApp } from 'vue';

import { socket as feathersSocket } from '@/lib/feathers';

import App from './App.vue';

createApp(App).mount('#app');

feathersSocket.open();
