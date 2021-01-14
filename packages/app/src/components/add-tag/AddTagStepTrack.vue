<template>
  <div class="flex flex-col w-full">
    <!-- Search -->
    <Textfield
      v-model="search"
      class="w-full px-4 -mt-5"
      placeholder="Suche einen Titel ..."
      icon="fas fa-search"
    />

    <div v-if="isLoading" class="loading flex m-auto">
      <Loading />
    </div>
    <template v-else>
      <div v-if="search.length < 3" class="flex m-auto text-center">
        <span class="text-white font-heading text-2xl">Wähle ein schönes Lied für deinen Tag!</span>
      </div>
      <div v-else-if="search.length >= 3 && tracks.length === 0" class="m-auto text-center">
        <img class="mb-4" src="../../assets/not-found.gif" />
        <span class="text-white font-heading text-2xl">Keine Ergebnisse für "{{ search }}"</span>
      </div>
      <div v-else class="w-full min-h-0 pt-4 overflow-y-auto">
        <div class="flex flex-col w-full">
          <div
            v-for="track in tracks"
            :key="track.uri"
            class="flex flex-row py-2 px-2 rounded-2xl w-5/6 mx-auto"
            :class="{ 'bg-primary': selectedTrack && track.uri === selectedTrack.uri }"
            @click="changeTrack(track)"
          >
            <TagEntry :img="track.imageUri" class="w-16" />
            <div class="flex flex-col">
              <span class="ml-4 text-lg">{{ track.title }}</span>
              <span class="ml-4 text-base">{{ track.artists.join(', ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { NFCTag, SpotifyTrack } from '@leek/commons';
import { debounce } from 'lodash';
import { defineComponent, PropType, ref, watch } from 'vue';

import feathers from '../../lib/feathers';
import Loading from '../uiBlocks/Loading.vue';
import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepTrack',

  components: {
    Textfield,
    TagEntry,
    Loading,
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
    const isLoading = ref<boolean>(false);
    const tracks = ref<SpotifyTrack[]>([]);
    const tag = ref<NFCTag | null>(props.nfcTag);
    const selectedTrack = ref<SpotifyTrack>();

    const doSearch = debounce(async () => {
      const params = {
        query: {
          name: search.value,
        },
      };
      tracks.value = (await feathers.service('spotify-tracks').find(params)) as SpotifyTrack[];
      isLoading.value = false;
    }, 1000 * 0.5);

    watch(search, async (_search) => {
      if (_search.length >= 3) {
        isLoading.value = true;
        await doSearch();
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
      isLoading,
      tracks,
      changeTrack,
      selectedTrack,
    };
  },
});
</script>
