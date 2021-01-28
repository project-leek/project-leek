<template>
  <div
    class="overflow-hidden bg-gradient-to-b from-primary to-secondary grid grid-cols-1 grid-rows-30 h-full w-full"
  >
    <!-- cube -->
    <div class="z-10 col-start-1 col-end-1 row-start-1 row-end-10 md:row-end-6 grid grid-cols-2">
      <img
        class="col-start-1 col-end-1 max-h-full transform -translate-x-24 rotate-12"
        src="/src/assets/cube.png"
      />
    </div>
    <!-- header Text -->
    <div class="z-20 row-start-7 row-end-20 col-start-1 col-end-1 flex flex-col items-center">
      <div>
        <p class="font-heading font-light text-white text-5xl">Smart Music Box</p>
        <p class="font-default text-xl">Play your favorite tracks with tags.</p>
      </div>
    </div>
    <!-- login button -->
    <div class="z-20 col-start-1 col-end-1 row-start-20 row-end-25 flex justify-center">
      <Button
        class="h-3/6 items-center ring-2 ring-button ring-opacity-75 px-4"
        text="Login with Spotify"
        :to="{ name: 'oauth-start', params: { oauthProvider: 'spotify' } }"
        icon="fab fa-spotify"
        :text-size="3"
        :icon-size="5"
      />
    </div>
    <!-- cube -->
    <div class="z-10 col-start-1 col-end-1 row-start-25 row-end-31 grid grid-cols-2">
      <img
        class="justify-self-end col-start-2 col-end-2 max-h-full transform translate-x-24 rotate-45"
        src="/src/assets/cube.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '../components/uiBlocks/Button.vue';

export default defineComponent({
  name: 'Welcome',
  components: {
    Button,
  },
});
</script>

<style></style>
