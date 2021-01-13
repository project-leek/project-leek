<template>
  <div class="flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <TagEntry class="ml-8 w-32" :img="mImageURL" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import TagEntry from './uiBlocks/TagEntry.vue';

export default defineComponent({
  name: 'AddTagStepImage',
  components: { TagEntry },
  props: {
    imageURL: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const mImageURL = ref(props.imageURL);
    return { mImageURL };
  },
});
</script>
