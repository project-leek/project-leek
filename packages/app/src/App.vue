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
      <div v-if="showNotConnected" class="m-auto flex flex-col">
        <p class="font-default text-2xl text-center">Wer hat die Box geklaut?</p>
        <img class="mt-8" src="/src/assets/search.gif" />
        <Button class="pr-8 mt-8" text="Neue Box einrichten" @click="resetBackend" />
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from './components/uiBlocks/Button.vue';
import { isAuthenticated, user } from './compositions/useAuthentication';
import {
  closeBackendConnection,
  isBackendConnected,
  setBackendUrl,
} from './compositions/useBackend';
import { doesUserHaveOwnReaders, readers } from './compositions/useNfcReader';

export default defineComponent({
  name: 'App',

  components: {
    Button,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(readers, async () => {
      // send authenticated users without readers to settings
      if (isAuthenticated.value && !(await doesUserHaveOwnReaders()) && route.name !== 'settings') {
        await router.push({ name: 'settings' });
        return;
      }
    });

    const resetBackend = async (): Promise<void> => {
      setBackendUrl(null);
      closeBackendConnection();
      await router.push({ name: 'setup' });
    };

    const showNotConnected = computed(() => route.name !== 'setup' && !isBackendConnected.value);

    return {
      showNotConnected,
      resetBackend,
    };
  },
});
</script>

<style lang="css">
html,
body {
  height: 100%;
  width: 100%;
  padding: 0%;
  margin: 0;
  border: none;
}

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
