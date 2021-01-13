<template>
  <div class="flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <TagEntry class="ml-8 w-32" :img="imageUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TagEntry from '../uiBlocks/TagEntry.vue';

export default defineComponent({
  name: 'AddTagStepImage',

  components: { TagEntry },

  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>
