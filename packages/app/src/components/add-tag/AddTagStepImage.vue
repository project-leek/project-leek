<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start px-8 py-5">
    <div class="text-lg pb-1 font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry
        class="w-44"
        :img="spotifyImageUrl"
        :ring="usingSpotifyImage"
        ring-color="ring-green-500"
        @click="changeImage(true)"
      />
    </div>
    <div class="pt-8 pb-1 text-lg font-semibold text-white">Bild aus dem Internet</div>
    <div class="flex content-end">
      <TagEntry
        class="w-44"
        :img="externalImage"
        :ring="!usingSpotifyImage"
        ring-color="ring-green-500"
        @click="changeImage(false)"
      />
    </div>
    <Textfield v-model="userInput" class="mt-2 w-full" placeholder="enter URL" />
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
    const currentTag = ref<NFCTag>(props.nfcTag);
    const spotifyImageUrl = ref<string>(currentTag.value.spotifyImageUrl);
    const userInput = ref<string>(
      currentTag.value.imageUrl !== spotifyImageUrl.value ? currentTag.value.imageUrl : ''
    );
    const usingSpotifyImage = ref<boolean>(
      !currentTag.value.imageUrl || currentTag.value.imageUrl === currentTag.value.spotifyImageUrl
    );
    const placeholderImagePath = '/image-gallery.svg';

    const correctImageUrl = (phrase: string): boolean => {
      const regex = /((https)|(http)):\/\/.*\.((jpg)|(png)|(tiff)|(gif)|(jpeg)|(bmp))/i;
      if (phrase != null) {
        if (regex.exec(phrase)) {
          return true;
        }
      }
      usingSpotifyImage.value = true;
      return false;
    };

    const externalImage = computed(() => {
      if (correctImageUrl(userInput.value)) {
        return userInput.value;
      }
      return placeholderImagePath;
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
