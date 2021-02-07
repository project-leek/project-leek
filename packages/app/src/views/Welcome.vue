<template>
  <div
    class="overflow-hidden lg:rounded-3xl bg-gradient-to-b from-primary to-secondary grid grid-cols-1 grid-rows-30 h-full w-full relative"
  >
    <!-- cube -->
    <div class="z-10 col-start-1 col-end-1 row-start-1 row-end-10 md:row-end-6 grid grid-cols-2">
      <img
        class="col-start-1 col-end-1 max-h-full transform -translate-x-24 rotate-12"
        src="/src/assets/cube.png"
      />
    </div>
    <!-- header Text -->
    <div class="z-20 row-start-7 row-end-20 col-start-1 col-end-1 flex flex-col items-center mx-8">
      <div>
        <p class="font-heading font-light text-white text-5xl text-center">Leek-Box</p>
        <p class="font-default text-xl text-center">Höre deine Lieblingssongs durch Auflegen von NFC-Tags.</p>
      </div>
    </div>
    <!-- login button -->
    <Button
      text="Login mit Spotify"
      :to="{ name: 'oauth-start', params: { oauthProvider: 'spotify' } }"
      class="row-start-20 mx-auto py-10 w-2/3"
      icon="fab fa-spotify"
      size="lg"
    />
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
