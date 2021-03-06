<template>
  <div class="add-tag-step-image flex flex-grow flex-col justify-start items-start px-8 py-5">
    <LabeledInput label="Bild von Spotify">
      <div class="flex content-end">
        <TagEntry
          class="w-44 cursor-pointer"
          :img="spotifyImageUrl || '/image-gallery.svg'"
          :selected="imageSource === 'spotify'"
          @click="imageSource = 'spotify'"
        />
      </div>
    </LabeledInput>

    <LabeledInput label="Eigenes Bild" class="mt-8">
      <div class="flex content-end">
        <TagEntry
          class="w-44 cursor-pointer"
          :img="sanitizedExternalImageUrl || '/image-gallery.svg'"
          :selected="imageSource === 'external'"
          @click="imageSource = 'external'"
        />
      </div>
      <Textfield
        v-if="imageSource === 'external'"
        v-model="externalImageUrl"
        class="mt-2 w-full"
        placeholder="Bild URL"
      />
    </LabeledInput>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { computed, defineComponent, onBeforeMount, PropType, ref, watch } from 'vue';

import { getTrackOfTag } from '../../compositions/useTrack';
import LabeledInput from '../uiBlocks/LabeledInput.vue';
import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

const urlRegex = /((https)|(http)):\/\/.*/i;

export default defineComponent({
  name: 'TagStepImage',

  components: { LabeledInput, TagEntry, Textfield },

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
    const spotifyImageUrl = ref<string>();
    const externalImageUrl = ref<string>();
    const sanitizedExternalImageUrl = computed(() => {
      if (externalImageUrl.value && !urlRegex.test(externalImageUrl.value)) {
        return null;
      }

      return externalImageUrl.value;
    });
    const imageSource = ref<'spotify' | 'external' | null>(null);

    const imageUrl = computed({
      get: () => props.nfcTag.imageUrl,
      set: (_imageUrl: string) => {
        const tagCopy = props.nfcTag;
        tagCopy.imageUrl = _imageUrl;
        ctx.emit('update:nfc-tag', tagCopy);
        ctx.emit('update:is-valid', _imageUrl !== '');
      },
    });

    onBeforeMount(async () => {
      const track = await getTrackOfTag(props.nfcTag);
      spotifyImageUrl.value = track.imageUri;

      if (imageUrl.value === spotifyImageUrl.value) {
        imageSource.value = 'spotify';
        return;
      }

      if (urlRegex.test(imageUrl.value)) {
        externalImageUrl.value = imageUrl.value;
        imageSource.value = 'external';
      }
    });

    watch(imageSource, (_imageSource) => {
      if (_imageSource === 'spotify' && spotifyImageUrl.value) {
        imageUrl.value = spotifyImageUrl.value;
      }

      if (_imageSource === 'external') {
        imageUrl.value = externalImageUrl.value || '';
      }
    });

    watch(externalImageUrl, () => {
      imageUrl.value = externalImageUrl.value || '';
    });

    return {
      imageSource,
      spotifyImageUrl,
      sanitizedExternalImageUrl,
      externalImageUrl,
    };
  },
});
</script>
