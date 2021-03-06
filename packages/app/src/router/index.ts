import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { isAuthenticated, load as loadAuthentication } from '../compositions/useAuthentication';
import { isBackendUrlConfigured, setBackendUrl } from '../compositions/useBackend';
import { readers } from '../compositions/useNfcReader';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth/callback',
    name: 'oauth-callback',
    component: (): Component => import('../views/auth/OAuthCallback.vue'),
    meta: { authentication: 'guests-only' },
  },
  {
    path: '/auth/:oauthProvider',
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
    path: '/setup/',
    name: 'setup',
    component: (): Component => import('../views/Setup.vue'),
    meta: { authentication: 'ignored' },
  },
  {
    path: '/setup/:url',
    name: 'setup-direct',
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
    path: '/reader/:readerId',
    name: 'reader',
    component: (): Component => import('../views/ReaderDetails.vue'),
    props: true,
  },
  {
    path: '/tag/add',
    name: 'tag-add',
    component: (): Component => import('../views/tag/AddTag.vue'),
  },
  {
    path: '/tag/:tagId',
    name: 'tag-details',
    component: (): Component => import('../views/tag/TagDetails.vue'),
    props: true,
  },
  {
    path: '/tag/:tagId/image',
    name: 'tag-edit-image',
    component: (): Component => import('../views/tag/TagDetails.vue'),
    props: true,
  },
  {
    path: '/tag/:tagId/track',
    name: 'tag-edit-track',
    component: (): Component => import('../views/tag/TagDetails.vue'),
    props: true,
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: (): Component => import('../views/Sandbox.vue'),
    meta: { authentication: 'ignored', noBackendConnectionNeeded: true },
  },
  // this should be the last route to catch all unhandled requests
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { authentication: 'ignored', noBackendConnectionNeeded: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.name === 'setup-direct' && to.params.url) {
    const url = atob(to.params.url as string);
    setBackendUrl(url);
    location.replace('/');
    return;
  }

  if (!isBackendUrlConfigured.value) {
    if (to.name === 'setup') {
      next();
      return;
    }

    next({ name: 'setup' });
    return;
  }

  if (to.name === 'setup') {
    next({ name: 'welcome' });
    return;
  }

  const pageAuthentication = (to.meta.authentication as string) || 'needed';

  if (pageAuthentication === 'ignored') {
    next();
    return;
  }

  await loadAuthentication();

  if (pageAuthentication === 'needed' && !isAuthenticated.value) {
    next({ name: 'welcome' });
    return;
  }

  if (pageAuthentication === 'guests-only' && isAuthenticated.value) {
    next({ name: 'home' });
    return;
  }

  // authenticated but without configured readers
  if (readers.value && readers.value.length === 0 && to.name !== 'settings') {
    next({ name: 'settings' });
    return;
  }

  next();
});

export default router;
