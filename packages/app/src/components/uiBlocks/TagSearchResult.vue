<template>
  <div class="grid grid-cols-2">
    <TagEntry
      v-for="tag in searchResult"
      :key="tag.nfcData"
      class="m-4 w-2/6 flex-shrink-0 text-4xl"
      :class="{ 'opacity-25': selectedTag !== tag && selectedTag !== null }"
      :img="tag.imageUrl"
      :name="tag.name"
      @click="$emit('tag-selected', tag)"
    />
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, PropType, ref } from 'vue';

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
    const searchResult = ref<NFCTag[]>([]);

    async function loadTags(): Promise<void> {
      const service = feathers.service('nfc-tags');
      const allTags = (await service.find()) as Paginated<NFCTag>;
      //filter NFC Tag
      allTags.data.forEach((nfcTag) => {
        let name = nfcTag.name.toLowerCase();
        let phrase = props.searchInput.toLowerCase();
        if (name.search(phrase) > -1) {
          searchResult.value.push(nfcTag);
        }
      });
    }

    onMounted(async () => await loadTags());

    return {
      searchResult,
    };
  },
});
</script>
