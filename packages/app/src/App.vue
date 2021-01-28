<template>
  <div class="app bg-green-800 flex">
    <div class="flex lg:max-w-xl bg-white lg:rounded-2xl lg:my-8 mx-auto flex-grow w-full">
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

<style lang="css">
.app {
  height: 100vh;
}
</style>
