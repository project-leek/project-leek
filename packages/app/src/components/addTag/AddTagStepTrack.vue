<template>
  <div id="content_wrapper" class="flex flex-col">
    <!-- Search -->
    <Textfield
      v-model="search"
      class="mx-auto mb-8"
      placeholder="Titelsuche"
      icon="fas fa-search"
    />

    <!-- Last listened -->
    <p class="text-white font-heading text-base ml-6">Zuletzt auf Spotify gehört</p>
    <!-- Replace With Carussel -->
    <div id="Carussel" class="flex ml-4 mt-2">
      <div class="w-28 mr-4">
        <div class="h-28 w-full bg-green-400"></div>
        <div class="text-white font-heading text-sm">Geschichten aus der Geschichte</div>
      </div>

      <div class="w-28 mr-4">
        <div class="h-28 w-full bg-green-400 mr-4"></div>
        <div class="text-white font-heading text-sm">Philosophie Geschichte</div>
      </div>

      <div class="w-28">
        <div class="h-28 w-full bg-green-400 mr-4"></div>
        <div class="text-white font-heading text-sm">Big Beats</div>
      </div>
    </div>

    <div id="liste">
      <ul>
        <li v-for="track in tracks" :key="track.uri" @click="changeTrack">
          <span :class="{ 'bg-red-400': selectedTrack && selectedTrack.uri === track.uri }">
            {{ track.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag, SpotifyTrack } from '@leek/commons';
import { defineComponent, PropType, ref, watch } from 'vue';

import feathers from '../../lib/feathers';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepTrack',
  components: {
    Textfield,
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
