import { ref, getCurrentInstance, computed, watch } from 'vue';
import { Router } from 'vue-router';
import { User } from '@project-leek/commons';

import feathers from '../lib/feathers';

function getRouter(): Router {
  const vm = getCurrentInstance();

  if (!vm) {
    throw new ReferenceError('Not found vue instance.');
  }

  return vm.$router;
}

export const user = ref<User | null>(null);
export const isAuthenticated = computed(() => !!user.value);

export async function load() {
  try {
    await feathers.reAuthenticate();
    user.value = (await feathers.get('authentication')).user;
  } catch (error) {
    console.error('authentication needed', error);
  }
}

export async function logout() {
  user.value = null;
  feathers.logout();
}

watch(
  () => isAuthenticated,
  async (_isAuthenticated) => {
    const pageNeedAuthentication = true; // TODO
    if (!_isAuthenticated && pageNeedAuthentication) {
      await getRouter().replace({ name: 'login' });
    }
  }
);
