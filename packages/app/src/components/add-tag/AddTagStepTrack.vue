<template>
  <div id="content_wrapper" class="flex flex-col h-full">
    <!-- Search -->
    <Textfield
      v-model="search"
      class="mx-auto -mt-4 mb-4"
      placeholder="Titelsuche"
      icon="fas fa-search"
    />

    <span class="ml-10 text-white font-heading"> Passende Songs zu deiner Eingabe: </span>
    <div class="w-full h-96 mt-5 overflow-y-auto">
      <div id="liste" class="flex flex-col w-full">
        <div
          v-for="track in tracks"
          :key="track._id"
          class="flex flex-row py-2 px-2 hover:bg-primary rounded-2xl w-5/6 mx-auto"
        >
          <TagEntry :img="track.imageUri" class="w-16" @click="changeTrack(track)" />
          <div class="flex flex-col">
            <span class="ml-4 text-lg">{{ track.title }}</span>
            <span class="ml-4 text-base">{{ track.artists.join(', ') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag, SpotifyTrack } from '@leek/commons';
import { defineComponent, PropType, ref, watch } from 'vue';

import feathers from '../../lib/feathers';
import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepTrack',
  components: {
    Textfield,
    TagEntry,
  },
  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: ['update:nfc-tag'],
  setup(props, ctx) {
    const search = ref<string>('');
    const tracks = ref<SpotifyTrack[]>([]);
    const tag = ref<NFCTag>(props.nfcTag);
    const selectedTrack = ref<SpotifyTrack>();

    watch(search, async (search) => {
      if (search.length >= 3) {
        const params = {
          query: {
            name: search,
          },
        };
        tracks.value = (await feathers.service('spotify-tracks').find(params)) as SpotifyTrack[];
      } else if (search.length === 0) {
        tracks.value = [];
      }
    });

    const changeTrack = (track: SpotifyTrack): void => {
      selectedTrack.value = track;
      tag.value.spotifyTrackUri = track.uri;
      tag.value.imageUrl = track.imageUri;
      ctx.emit('update:nfc-tag', tag);
    };

    return {
      search,
      tracks,
      changeTrack,
      selectedTrack,
    };
  },
});
</script>

<style></style>
