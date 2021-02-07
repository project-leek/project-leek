<template>
  <div
    class="overflow-hidden bg-gradient-to-b from-primary to-secondary md:rounded-3xl w-full flex flex-col relative"
  >
    <!-- cube -->
    <div class="z-10">
      <img
        class="absolute -z-10 top-0 left-0 w-38 transform -translate-x-50/100 -translate-y-20/100 rotate-12"
        src="/src/assets/cube.png"
      />
      <!-- cube -->
      <img
        class="absolute z-0 right-0 bottom-0 w-38 transform translate-x-50/100 translate-y-20/100 rotate-45"
        src="/src/assets/cube.png"
      />
    </div>
    <!-- header Text -->
    <div class="z-20 flex flex-col m-auto px-4 relative">
      <p class="font-heading font-light text-white text-center text-5xl">Leek-Box</p>
      <p class="font-default text-2xl text-center max-w-3/4 mx-auto mt-4">
        Höre deine Lieblingssongs durch das Auflegen von NFC-Tags.
      </p>
      <!-- login button -->
      <Button
        text="Anmelden mit Spotify"
        :to="{ name: 'oauth-start', params: { oauthProvider: 'spotify' } }"
        class="w-full mt-8"
        icon="fab fa-spotify"
        size="lg"
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
