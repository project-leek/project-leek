import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { isAuthenticated, load as loadAuthentication } from '../compositions/useAuthentication';
import { isSetupApp } from '../compositions/useBackend';
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
    path: '/setup',
    name: 'setup',
    component: (): Component => import('../views/Setup.vue'),
    meta: { authentication: 'ignored' },
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: (): Component => import('../views/Welcome.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/tag/:tagId',
    name: 'tag-details',
    component: (): Component => import('../views/TagDetails.vue'),
    props: true,
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: (): Component => import('../views/Sandbox.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: (): Component => import('../views/Settings.vue'),
  },
  {
    path: '/tag/add',
    name: 'add-tag',
    component: (): Component => import('../views/AddTag.vue'),
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: (): Component => import('../views/Sandbox.vue'),
    meta: { authentication: 'ignored' },
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
  if (isSetupApp.value && to.name !== 'setup') {
    next({ name: 'setup' });
    return;
  }

  if (!isSetupApp.value && to.name === 'setup') {
    next({ name: 'welcome' });
    return;
  }

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
