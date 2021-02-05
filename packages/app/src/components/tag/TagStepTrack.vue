<template>
  <div class="add-tag-step-track flex flex-col relative h-full w-full">
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
      <span class="text-white font-heading text-3xl"
        ><p>Wähle ein schönes Lied</p>
        <p>für deinen Tag!</p></span
      >
    </div>

    <div
      v-else-if="search.length >= 3 && tracks.length === 0"
      class="m-auto text-center justify-center p-2"
    >
      <img class="mb-4" src="/src/assets/not-found.gif" />
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
        <TagEntry :img="track.imageUri" class="w-20 h-20 flex-shrink-0" />
        <div class="flex flex-col text-white overflow-hidden">
          <span
            class="ml-4 text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis"
            >{{ track.title }}</span
          >
          <span class="ml-4 text-base whitespace-nowrap overflow-hidden overflow-ellipsis">{{
            track.artist
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { NFCTag, Track } from '@leek/commons';
import { debounce } from 'lodash';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';

import { getTrackOfTag, searchTracksByName } from '../../compositions/useTrack';
import Loading from '../uiBlocks/Loading.vue';
import TagEntry from '../uiBlocks/TagEntry.vue';
import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'TagStepTrack',

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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:nfc-tag': (_payload: NFCTag): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:is-valid': (_payload: boolean): boolean => true,
  },
  setup(props, ctx) {
    const search = ref<string>('');
    const isLoading = ref<boolean>(false);
    const tracks = ref<Track[]>([]);
    const selectedTrack = ref<Track>();

    const doSearch = debounce(async () => {
      tracks.value = await searchTracksByName(search.value);
      isLoading.value = false;
    }, 1000 * 0.5);

    watch(search, async (_search) => {
      if (_search.length >= 3) {
        isLoading.value = true;
        await doSearch();
      }
    });

    const changeTrack = (track: Track): void => {
      selectedTrack.value = track;
      const tagCopy = props.nfcTag;
      tagCopy.trackUri = track.uri;

      const isValid = !!track.uri;
      ctx.emit('update:nfc-tag', tagCopy);
      ctx.emit('update:is-valid', isValid);
    };

    onMounted(async () => {
      // select track if we already selected one
      if (props.nfcTag.trackUri) {
        const track = await getTrackOfTag(props.nfcTag);
        search.value = track.title;
        selectedTrack.value = track;
      }
    });

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
