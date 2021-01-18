import { User } from '@leek/commons';
import { computed, ref } from 'vue';

import feathers from '../lib/feathers';

export const user = ref<User | null>(null);

export const isAuthenticated = computed(() => !!user.value);

export async function load(): Promise<void> {
  try {
    await feathers.reAuthenticate();
    const authentication = await feathers.get('authentication');
    user.value = authentication ? authentication.user : null;
  } catch (ignore) {
    // this error can be ignored
  }
}

export async function logout(): Promise<void> {
  await feathers.logout();
  user.value = null;
}
