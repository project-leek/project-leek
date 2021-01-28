<template>
  <div class="px-10 py-8">
    <div
      v-for="result in searchResult"
      :key="result.tag.nfcData"
      class="flex pb-6"
      :class="{ 'opacity-25 ': selectedTag !== result.tag && selectedTag !== null }"
      @click="$emit('tag-selected', result.tag)"
    >
      <TagEntry :img="result.track.imageUri" class="w-2/6 flex-shrink-0" />
      <div class="pl-5 flex flex-col text-white overflow-hidden flex-grow">
        <span class="text-2xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
          {{ result.tag.name }}
        </span>
        <span
          v-if="result.track.artist"
          class="pt-2 text-xl whitespace-nowrap overflow-hidden overflow-ellipsis"
          ><div class="flex flex-row">
            <div class="flex flex-col italic font-thin">
              <div>Artist:</div>
              <div>Titel:</div>
            </div>
            <div class="flex flex-col pl-3">
              <div>{{ result.track.artist }}</div>
              <div>{{ result.track.title }}</div>
            </div>
          </div>
        </span>
      </div>
    </div>

    <!-- <div v-if="searchResult.length === 0" class="m-auto text-center justify-center p-2">
      <img class="mb-4" src="../../assets/not-found.gif" />
      <span class="text-white font-heading text-2xl">Keine Ergebnisse für {{ searchInput }}</span>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag, SpotifyTrack } from '@leek/commons';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

import feathers from '../../lib/feathers';
import TagEntry from './TagEntry.vue';

export default defineComponent({
  name: 'TagSearchResult',

  components: {
    TagEntry,
  },

  props: {
    selectedTag: {
      type: Object as PropType<NFCTag | null>,
      default: null,
    },
    searchInput: {
      type: String,
      default: '',
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'tag-selected': (_payload: NFCTag): boolean => true,
  },
  setup(props) {
    type SearchIndex = {
      searchPattern: string;
      id: string;
    };

    type TrackTagTuple = {
      track: SpotifyTrack;
      tag: NFCTag;
    };

    const allTags = ref<TrackTagTuple[]>([]);

    const searchIndex = computed(() => {
      const res = allTags.value.reduce((previous, current) => {
        return [
          ...previous,
          { searchPattern: current.tag.name.toLowerCase(), id: current.tag._id },
          { searchPattern: current.track.title.toLowerCase(), id: current.tag._id },
          { searchPattern: current.track.artist.toLowerCase(), id: current.tag._id },
        ];
      }, [] as SearchIndex[]);

      return res;
    });

    const searchedIndices = computed(() => {
      const res = searchIndex.value
        .filter((s) => s.searchPattern.search(props.searchInput.toLowerCase()) > -1)
        .map((s) => s.id);
      return res;
    });

    const searchResult = computed(() => {
      const res = allTags.value.filter((t) => searchedIndices.value.includes(t.tag._id));
      return res;
    });

    const loadTags = async (): Promise<void> => {
      const tagResult = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;
      const trackResult = tagResult.data.map((t) =>
        feathers.service('spotify-tracks').get(t.trackUri)
      );
      const tracks = await Promise.all(trackResult);

      allTags.value = tagResult.data.map((tag) => ({
        tag,
        track: tracks.find((track) => track.uri === tag.trackUri) as SpotifyTrack,
      }));
    };

    const removeTag = (removedTag: NFCTag): void => {
      allTags.value = allTags.value.filter((tag) => tag.tag._id !== removedTag._id);
    };

    onMounted(async () => {
      await loadTags();
      feathers.service('nfc-tags').on('removed', removeTag);
    });

    return {
      searchResult,
    };
  },
});
</script>
