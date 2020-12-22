import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import { isAuthenticated, load as loadAuthentication } from '../compositions/useAuthentication';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../components/Welcome.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/oauth/callback',
    name: 'oauth-callback',
    component: () => import('../views/auth/OAuthCallback.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/oauth/:oauthProvider',
    name: 'oauth-start',
    component: () => import('../views/auth/OAuthStart.vue'),
    meta: { authentication: 'guests-only' },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { authentication: 'ignored' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  await loadAuthentication();

  const pageAuthentication = to.meta.authentication || 'needed';

  if (pageAuthentication === 'needed' && !isAuthenticated.value) {
    next({ name: 'welcome' });
    return;
  }

  if (pageAuthentication === 'guests-only' && isAuthenticated.value) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
