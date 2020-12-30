<template>
  <div class="app flex">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { isAuthenticated } from './compositions/useAuthentication';

export default defineComponent({
  name: 'App',

  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => isAuthenticated.value,
      async (_isAuthenticated) => {
        // if not authenticated and on page that requests authentication
        const pageAuthentication = route.meta.authentication || 'needed';
        if (pageAuthentication === 'needed' && !_isAuthenticated) {
          router.replace({ name: 'welcome' });
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
