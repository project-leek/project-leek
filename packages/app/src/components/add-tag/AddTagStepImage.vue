<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start px-8 py-5">
    <div class="text-lg pb-1 font-semibold text-white">Bild von Spotify</div>
    <div class="flex content-end">
      <TagEntry
        class="w-44"
        :img="trackImageUrl"
        :ring="usingTrackImage"
        ring-color="ring-green-500"
        @click="changeImage(true)"
      />
    </div>
    <div class="pt-8 pb-1 text-lg font-semibold text-white">Bild aus dem Internet</div>
    <div class="flex content-end">
      <TagEntry
        class="w-44"
        :img="externalImage"
        :ring="!usingTrackImage"
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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:nfc-tag': (_payload: NFCTag): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:is-valid': (_payload: boolean): boolean => true,
  },
  setup(props, ctx) {
    const currentTag = ref<NFCTag>(props.nfcTag);
    const trackImageUrl = ref<string>(currentTag.value.trackImageUrl);
    const userInput = ref<string>(
      currentTag.value.imageUrl !== trackImageUrl.value ? currentTag.value.imageUrl : ''
    );
    const usingTrackImage = ref<boolean>(
      !currentTag.value.imageUrl || currentTag.value.imageUrl === currentTag.value.trackImageUrl
    );
    const placeholderImagePath = '/image-gallery.svg';

    const correctImageUrl = (phrase: string): boolean => {
      let isCorrect = false;
      const regex = /((https)|(http)):\/\/.*\.((jpg)|(png)|(tiff)|(gif)|(jpeg)|(bmp))/i;
      if (phrase != null) {
        if (regex.exec(phrase)) {
          isCorrect = true;
        }
      }
      usingTrackImage.value = !isCorrect;
      updateTagImage();
      return isCorrect;
    };

    const externalImage = computed(() => {
      if (correctImageUrl(userInput.value)) {
        return userInput.value;
      }
      return placeholderImagePath;
    });

    const updateTagImage = (): void => {
      //Depending on chosen Image, save that url as imageUrl
      if (usingTrackImage.value) {
        currentTag.value.imageUrl = trackImageUrl.value;
      } else {
        currentTag.value.imageUrl = userInput.value;
      }
    };

    const changeImage = (useTrackImage: boolean): void => {
      //Check if externalImage is clicked and a correct URL is provided
      if (!useTrackImage && correctImageUrl(userInput.value)) {
        usingTrackImage.value = false;
      } else {
        usingTrackImage.value = true;
      }

      updateTagImage();
      const valid: boolean = useTrackImage
        ? currentTag.value.trackImageUrl !== ''
        : currentTag.value.imageUrl !== '';
      //I want a blanc line here!
      ctx.emit('update:nfc-tag', currentTag.value);
      ctx.emit('update:is-valid', valid);
    };

    return {
      externalImage,
      userInput,
      usingTrackImage,
      changeImage,
      trackImageUrl,
    };
  },
});
</script>
