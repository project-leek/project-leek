<template>
  <div class="flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <TagEntry class="ml-8 w-32" name="" img="{{mImage}}" />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, ref } from 'vue';

import TagEntry from './uiBlocks/TagEntry.vue';

export default defineComponent({
  name: 'AddTagStepImage',
  components: { TagEntry },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const mImage = ref<string>(props.image);
    const mNFCTag = ref(props.nfcTag);
    return { mImage, mNFCTag };
  },
});
</script>
