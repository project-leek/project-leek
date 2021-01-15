<template>
  <div class="add-tag-step-track flex flex-col relative h-full">
    <!-- Search -->
    <div class="search px-4">
      <Textfield
        v-model="search"
        class="w-full"
        placeholder="Suche einen Titel ..."
        icon="fas fa-search"
      />
    </div>

    <div v-if="isLoading" class="loading flex m-auto p-2">
      <Loading />
    </div>
    <div v-else-if="search.length < 3" class="flex m-auto text-center p-2">
      <span class="text-white font-heading text-2xl"
        >Wähle jetzt ein schönes Lied für deinen Tag!</span
      >
    </div>

    <div
      v-else-if="search.length >= 3 && tracks.length === 0"
      class="m-auto text-center justify-center p-2"
    >
      <img class="mb-4" src="../../assets/not-found-die-andere.gif" />
      <span class="text-white font-heading text-2xl">Keine Ergebnisse für "{{ search }}"</span>
    </div>

    <ul v-else class="flex flex-col mt-4 pb-6 w-full overflow-y-auto max-h-full">
      <li
        v-for="track in tracks"
        :key="track.uri"
        class="flex flex-row py-2 px-2 rounded-2xl w-5/6 mx-auto cursor-pointer border border-transparent"
        :class="{ 'shadow-xl border-yellow-400': selectedTrack && track.uri === selectedTrack.uri }"
        @click="changeTrack(track)"
      >
        <TagEntry :img="track.imageUri" class="w-20" />
        <div class="flex flex-col text-white">
          <span
            class="ml-4 text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis"
            >{{ track.title }}</span
          >
          <span class="ml-4 text-base whitespace-nowrap overflow-hidden overflow-ellipsis">{{
            track.artists.join(', ')
          }}</span>
        </div>
      </li>
    </ul>
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
    const tag = ref<NFCTag>(props.nfcTag);
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

      const tagCopy = tag.value;
      tagCopy.spotifyTrackUri = track.uri;
      tagCopy.imageUrl = track.imageUri;

      ctx.emit('update:nfc-tag', tagCopy);
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

<style scoped>
.search {
  position: relative;
  z-index: 100;
}

.search::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #fff;
  content: '';
  z-index: -1;
}
</style>
