<template>
  <div class="app font-primary h-screen bg-yellow-600 flex flex-col items-center justify-center">
    <svg
      class="background lg:flex hidden"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
    </svg>
    <div
      class="flex md:shadow-2xl md:max-w-xl md:max-h-3/4 bg-white md:rounded-3xl w-full h-full relative"
    >
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
  position: relative;
}

.app .background {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.app .background .shape-fill {
  fill: #f09000;
}
</style>
