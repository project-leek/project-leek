import './compositions/useBackend';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fontsource/roboto/400.css';
import '@fontsource/baloo-2/700.css';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
