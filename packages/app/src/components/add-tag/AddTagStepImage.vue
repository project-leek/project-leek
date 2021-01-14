<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry class="ml-8 w-32" img="nfcTag.imageUrl-:vorneran" @click="changeImage(true)" />
      <span v-if="isSpotify" class="fas fa-check-circle transform -translate-x-9"></span>
    </div>
    <div class="m-8 text-lg font-semibold text-white">Mit eigenem Bild ersetzen</div>
    <div class="flex content-end">
      <TagEntry class="ml-8 w-32" :img="externalImage" @click="changeImage(false)" />
      <span v-if="!isSpotify" class="fas fa-check-circle transform -translate-x-9"></span>
    </div>
    <Textfield v-model="externalImage" class="m-8 w-full" placeholder="enter URL" />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, onUnmounted, PropType, ref } from 'vue';

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

  emits: ['update:nfc-tag'],

  setup(props, ctx) {
    const isSpotify = ref<boolean>(true);
    const externalImage = ref<string>('');

    const changeImage = (val: boolean): void => {
      isSpotify.value = val;
    };

    onUnmounted(() => {
      const nfcTag = props.nfcTag;
      if (isSpotify.value) {
        nfcTag.activeImageUrl = nfcTag.spotifyImageUrl;
      } else {
        nfcTag.activeImageUrl = externalImage.value;
      }
      ctx.emit('update:nfc-tag', nfcTag);
    });

    return { externalImage, isSpotify, changeImage };
  },
});
</script>
