import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { isAuthenticated, load as loadAuthentication } from '../compositions/useAuthentication';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/oauth/callback',
    name: 'oauth-callback',
    component: (): Component => import('../views/auth/OAuthCallback.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/oauth/:oauthProvider',
    name: 'oauth-start',
    component: (): Component => import('../views/auth/OAuthStart.vue'),
    meta: { authentication: 'guests-only' },
    props: true,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: (): Component => import('../views/Welcome.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/tag/:id',
    name: 'Tag Details',
    component: (): Component => import('../views/TagDetails.vue'),
    meta: { authentication: 'needed' },
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: (): Component => import('../views/Sandbox.vue'),
  },
  {
    path: '/tag/add',
    name: 'add-tag',
    component: (): Component => import('../views/AddTag.vue'),
  },
  // this should be the last route to catch all unhandled requests
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

  const pageAuthentication = (to.meta.authentication as string) || 'needed';

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
