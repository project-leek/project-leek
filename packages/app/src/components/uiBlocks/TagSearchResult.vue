<template>
  <div class="px-10 py-8">
    <div
      v-for="tag in searchResult"
      :key="tag.nfcData"
      class="flex pb-6"
      :class="{ 'opacity-25 ': selectedTag !== tag && selectedTag !== null }"
      @click="$emit('tag-selected', tag)"
    >
      <TagEntry :img="tag.imageUrl" class="w-2/6 flex-shrink-0" />
      <div class="pl-5 flex flex-col text-white overflow-hidden flex-grow">
        <span class="text-2xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
          {{ tag.name }}
        </span>
        <span
          v-if="tag.trackArtists"
          class="pt-2 text-xl whitespace-nowrap overflow-hidden overflow-ellipsis"
          ><div class="flex flex-row">
            <div class="flex flex-col italic font-thin">
              <div>Artist:</div>
              <div>Titel:</div>
            </div>
            <div class="flex flex-col pl-3">
              <div>{{ tag.trackArtists }}</div>
              <div>{{ tag.trackTitle }}</div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, PropType, ref, watchEffect } from 'vue';

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
    const allTags = ref<NFCTag[]>([]);
    const searchResult = ref<NFCTag[]>([]);

    const loadTags = async (): Promise<void> => {
      const service = feathers.service('nfc-tags');
      const fearthersResult = (await service.find()) as Paginated<NFCTag>;
      allTags.value = fearthersResult.data;
    };

    const removeTag = (removedTag: NFCTag): void => {
      allTags.value = allTags.value.filter((tag) => tag._id !== removedTag._id);
    };

    onMounted(async () => {
      await loadTags();
      feathers.service('nfc-tags').on('removed', removeTag);
    });

    watchEffect(() => {
      searchResult.value = [];

      if (allTags.value) {
        allTags.value.forEach((nfcTag) => {
          if (
            searchingFor(nfcTag.name) ||
            searchingFor(nfcTag.trackTitle) ||
            searchingFor(nfcTag.trackArtists)
          ) {
            searchResult.value.push(nfcTag);
          }
        });
      }
    });

    const searchingFor = (phrase: string): boolean => {
      if (phrase) {
        return phrase.toLowerCase().search(props.searchInput.toLowerCase()) > -1;
      } else {
        return false;
      }
    };

    return {
      searchResult,
    };
  },
});
</script>