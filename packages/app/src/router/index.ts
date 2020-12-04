import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/success',
    name: 'Response',
    component: Home,
  },
  {
    path: '/oauth/spotify',
    beforeEnter() {
      location.href = 'http://localhost:3030/oauth/spotify';
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
