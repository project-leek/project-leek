import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import {
  isAuthenticated,
  load as loadAuthentication,
} from '../compositions/authentication';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { publicPage: true },
  },
  {
    path: '/oauth/callback',
    name: 'oauth-callback',
    beforeEnter() {
      // TODO:
    },
    component: Home, // add this to create a proper type
    meta: { publicPage: true },
  },
  {
    path: '/oauth/spotify',
    name: 'oauth-spotify',
    beforeEnter() {
      location.href = 'http://localhost:3030/oauth/spotify';
    },
    component: Home, // add this to create a proper type
    meta: { publicPage: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { publicPage: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  await loadAuthentication();

  if (!isAuthenticated.value && !to.meta.publicPage) {
    next({ name: 'login' });
    return;
  }

  next();
});

export default router;
