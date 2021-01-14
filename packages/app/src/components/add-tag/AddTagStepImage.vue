<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <TagEntry class="ml-8 w-32" img="nfcTag.imageUrl-:vorneran" />
    <div class="m-8 text-lg font-semibold text-white">Bild aus dem Internet</div>
    <TagEntry class="ml-8 w-32" :img="externalImage" />
    <Textfield v-model="externalImage" class="m-8 w-full" placeholder="enter URL" />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, PropType, ref } from 'vue';

import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepImage',

  components: { TagEntry, Textfield },

  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: false, //set to true after testing
      default: null,
    },
  },

  setup() {
    const externalImage = ref<string>('');
    return { externalImage };
  },
});
</script>
