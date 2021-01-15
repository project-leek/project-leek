<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start">
    <div class="m-8 text-lg font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry class="ml-8 w-32" :img="spotifyImageUrl" @click="changeImage(true)" />
      <span v-if="isSpotify" class="far fa-check-circle transform -translate-x-9" />
    </div>
    <div class="mb-2 mx-8 mt-8 text-lg font-semibold text-white">Bild aus dem Internet</div>
    <div class="flex content-end">
      <TagEntry
        v-if="externalImage"
        class="ml-8 w-32"
        :img="externalImage"
        @click="changeImage(false)"
      />
      <span v-if="!isSpotify" class="far fa-check-circle transform -translate-x-9" />
    </div>
    <Textfield v-model="externalImage" class="mb-8 mx-8 mt-2 w-full" placeholder="enter URL" />
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
  emits: { 'update:nfc-tag': null },
  setup(props, ctx) {
    const isSpotify = ref<boolean>(true);
    const externalImage = ref<string>('');
    const currentTag = ref<NFCTag>(props.nfcTag);
    const spotifyImageUrl = ref<string>(currentTag.value.imageUrl);

    const changeImage = (val: boolean): void => {
      isSpotify.value = val;
      if (isSpotify.value) {
        currentTag.value.imageUrl = spotifyImageUrl.value;
      } else {
        currentTag.value.imageUrl = externalImage.value;
      }
      ctx.emit('update:nfc-tag', currentTag.value);
    };

    return { externalImage, isSpotify, changeImage, spotifyImageUrl };
  },
});
</script>
