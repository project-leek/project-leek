<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start p-8 p-8">
    <div class="text-lg font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry class="w-32" :img="spotifyImageUrl" @click="changeImage(true)" />
      <span
        v-if="usingSpotifyImage"
        class="text-white text-opacity-60 text-4xl far fa-check-circle transform -translate-x-20 translate-y-10"
      />
    </div>
    <div class="mb-2 text-lg font-semibold text-white">Bild aus dem Internet</div>
    <div class="flex content-end">
      <TagEntry class="w-32" :img="externalImage" @click="changeImage(false)" />
      <span
        v-if="!usingSpotifyImage"
        class="text-white text-opacity-60 text-4xl far fa-check-circle transform -translate-x-20 translate-y-10"
      />
    </div>
    <Textfield v-model="userInput" class="mt-3 w-full" placeholder="enter URL" />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { computed, defineComponent, PropType, ref } from 'vue';

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
    const usingSpotifyImage = ref<boolean>(true);
    const userInput = ref<string>('');
    //TODO fix broken svg route
    const currentTag = ref<NFCTag>(props.nfcTag);
    const spotifyImageUrl = ref<string>(currentTag.value.imageUrl);

    const correctImageUrl = (val: string): boolean => {
      const regex = /((https)|(http)):\/\/.*\.((jpg)|(png)|(tiff)|(gif)|(jpeg)|(bmp))/i;
      if (val != null) {
        if (regex.exec(val)) {
          return true;
        }
      }
      return false;
    };

    const externalImage = computed(() => {
      if (correctImageUrl(userInput.value)) {
        return userInput.value;
      }
      //TODO fix broken svg route
      usingSpotifyImage.value = true;
      return '../../assets/icons/plus.svg';
    });

    const changeImage = (useSpotifyImage: boolean): void => {
      //Check if externalImage is clicked and a correct URL is provided
      if (!useSpotifyImage && correctImageUrl(userInput.value)) {
        usingSpotifyImage.value = false;
      } else {
        usingSpotifyImage.value = true;
      }

      //Depending on chosen Image, save that url as imageUrl
      if (usingSpotifyImage.value) {
        currentTag.value.imageUrl = spotifyImageUrl.value;
      } else {
        currentTag.value.imageUrl = userInput.value;
      }

      ctx.emit('update:nfc-tag', currentTag.value);
    };

    return {
      externalImage,
      userInput,
      usingSpotifyImage,
      changeImage,
      spotifyImageUrl,
    };
  },
});
</script>
