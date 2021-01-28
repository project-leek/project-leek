<template>
  <div class="h-screen bg-green-800 flex flex-col items-center justify-center">
    <div class="flex lg:max-w-1/2 lg:max-h-3/4 bg-white lg:rounded-3xl w-full h-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { isAuthenticated } from './compositions/useAuthentication';

export default defineComponent({
  name: 'App',

  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => isAuthenticated.value,
      (_isAuthenticated) => {
        // if not authenticated and on page that requests authentication
        const pageAuthentication = (route.meta.authentication as string) || 'needed';
        if (pageAuthentication === 'needed' && !_isAuthenticated) {
          void router.replace({ name: 'welcome' });
        }
      }
    );
  },
});
</script>
