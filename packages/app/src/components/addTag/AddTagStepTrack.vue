<template>
  <div id="content_wrapper" class="flex flex-col">
    <!-- Search -->
    <Textfield
      v-model="search"
      class="mx-auto mb-8"
      placeholder="Titelsuche"
      icon="fas fa-search"
    />

    <!-- Last listened -->
    <p class="text-white font-heading text-base ml-6">Zuletzt auf Spotify gehört</p>
    <!-- Replace With Carussel -->
    <div id="Carussel" class="flex ml-4 mt-2">
      {{ search }}
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
