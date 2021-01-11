<template>
  <div id="content_wrapper" class="flex flex-col">
    <!-- Search -->
    <Textfield class="mx-auto mb-8" v-model="search" placeholder="Titelsuche" icon="fas fa-search" />

    <!-- Last listened -->
    <p class="text-white font-heading text-base ml-6">Zuletzt auf Spotify gehört</p>
    <!-- Replace With Carussel -->
    <div id="Carussel" class="flex ml-4 mt-2">
      <div class="w-28 mr-4">
        <div class="h-28 w-full bg-green-400"></div>
        <div class="text-white font-heading text-sm">Geschichten aus der Geschichte</div>
      </div>

      <div class="w-28 mr-4">
        <div class="h-28 w-full bg-green-400 mr-4"></div>
        <div class="text-white font-heading text-sm">Philosophie Geschichte</div>
      </div>

      <div class="w-28">
        <div class="h-28 w-full bg-green-400 mr-4"></div>
        <div class="text-white font-heading text-sm">Big Beats</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepTrack',
  components: {
    Textfield,
  },
  setup() {
    const search = ref<string>('');
    return {
      search,
    };
  },
});
</script>

<style></style>
