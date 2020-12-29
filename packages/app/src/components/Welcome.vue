<template>
  <img src="cube.png" width="500" height="500" style="position: absolute" />
  <div
    id="wrapper"
    class="w-full flex flex-col items-center h-full p-6 bg-gradient-to-b from-primary to-secondary"
  >
    <div id="header">
      <h1 class="mt-24 font-heading font-light text-white text-4xl">Smart Music Box</h1>
      <p class="mt-2 font-default">Play your favorite tracks with tags.</p>
    </div>
    <Button
      class="mx-auto mt-40 h-16 ring-2 ring-button ring-opacity-75"
      text="Login with SPOTIFY"
      :to="{ name: 'oauth-start', params: { oauthProvider: 'spotify' } }"
      image-path="spotify.png"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Button from './uiBlocks/Button.vue';

export default defineComponent({
  name: 'Welcome',
  components: {
    Button,
  },
});
</script>

<style></style>
