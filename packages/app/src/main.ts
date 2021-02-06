import '@fortawesome/fontawesome-free/css/all.css';
import '../index.css';
import '@fontsource/roboto/700.css'; // TODO disable font to get rid of an error
import '@fontsource/baloo-2/700.css'; // TODO disable font to get rid of an error
import './compositions/useBackend';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
