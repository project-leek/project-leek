<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry class="ml-8 w-32" :img="nfcTag.imageUrl" @click="changeImage(true)" />
      <span v-if="isSpotify" class="far fa-check-circle transform -translate-x-9" />
    </div>
    <div class="m-8 text-lg font-semibold text-white">Mit eigenem Bild ersetzen</div>
    <div class="flex content-end">
      <TagEntry class="ml-8 w-32" :img="externalImage" @click="changeImage(false)" />
      <span v-if="!isSpotify" class="far fa-check-circle transform -translate-x-9" />
    </div>
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
      required: true,
    },
  },

  setup() {
    const isSpotify = ref<boolean>(true);
    const externalImage = ref<string>('');

    const changeImage = (val: boolean): void => {
      isSpotify.value = val;
    };

    return { externalImage, isSpotify, changeImage };
  },
});
</script>
