import '@fortawesome/fontawesome-free/css/all.css';
import '../index.css';
import 'typeface-roboto';
import 'typeface-baloo';
import './compositions/useBackend';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
