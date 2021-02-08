import '@fortawesome/fontawesome-free/css/all.css';
import '../index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/baloo-2/700.css';
import './compositions/useBackend';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
