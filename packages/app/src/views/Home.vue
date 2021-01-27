<template>
  <div class="home w-full flex flex-col">
    <header class="flex py-5 justify-center text-4xl">
      <Button
        :to="{ name: 'add-tag' }"
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="5"
        class="py-2 mx-4 flex-grow"
      />
    </header>

    <main class="bg-secondary max-h-full overflow-y-auto flex-grow">
      <GroupDropDown v-if="!searchInput">
        <GroupDropDownItem
          v-for="group in groups"
          :key="group.name"
          :groupname="group.name"
          class="border-white border-b"
          @closed="selectedTag = null"
        >
          <div class="flex flex-row content-start overflow-auto">
            <TagEntry
              v-for="entry in group.tags"
              :key="entry.nfcData"
              class="m-4 w-2/6 flex-shrink-0 text-4xl"
              :class="{ 'opacity-25': selectedTag !== entry && selectedTag !== null }"
              :img="entry.imageUrl"
              :name="entry.name"
              @click="toggleSelectedTag(entry)"
            />
          </div>
        </GroupDropDownItem>
      </GroupDropDown>
      <TagSearchResult
        v-else
        v-model:selectedTag="selectedTag"
        :search-input="searchInput"
        @tag-selected="toggleSelectedTag($event)"
      />
    </main>
    <footer class="flex text-gray-800 py-5 overflow-hidden">
      <transition
        name="fade"
        @leave="infoTransitionActive = true"
        @after-leave="infoTransitionActive = false"
      >
        <span v-if="!selectedTag && !buttonTransitionActive" class="text-xl text-center w-full">
          <Textfield v-model="searchInput" class="mx-4" placeholder="Titelsuche" />
        </span>
      </transition>
      <transition name="slide" @after-leave="buttonTransitionActive = false">
        <span
          v-if="selectedTag && !infoTransitionActive"
          key="edit"
          class="flex justify-center w-full text-xl"
        >
          <Button
            round
            icon="fas fa-times"
            class="ml-4 my-auto h-10 w-10 bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
            @click="deselect"
          />
          <Button
            round
            text="Bearbeiten"
            class="ml-4 px-3 text-2xl ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
            :to="{ name: 'tag-details', params: { tagId: selectedTag._id } }"
          />
          <Button
            round
            text="Löschen"
            class="ml-4 px-3 text-2xl ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
            @click="deleteTag"
          />
        </span>
      </transition>
    </footer>
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import GroupDropDown from '../components/uiBlocks/GroupDropDown.vue';
import GroupDropDownItem from '../components/uiBlocks/GroupDropDownItem.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import TagSearchResult from '../components/uiBlocks/TagSearchResult.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import feathers from '../lib/feathers';

type NFCTagGroup = {
  name: string;
  tags: NFCTag[];
};

export default defineComponent({
  name: 'Home',

  components: {
    Button,
    TagEntry,
    GroupDropDown,
    GroupDropDownItem,
    Textfield,
    TagSearchResult,
  },

  setup() {
    const groups = ref<NFCTagGroup[]>([]);
    const selectedTag = ref<NFCTag | null>(null);
    const nfcTags = feathers.service('nfc-tags');
    const searchInput = ref<string>('');

    const toggleSelectedTag = (tag: NFCTag): void => {
      selectedTag.value = tag === selectedTag.value ? null : tag;
      buttonTransitionActive.value = true;
    };

    const infoTransitionActive = ref<boolean>(false);
    const buttonTransitionActive = ref<boolean>(false);

    const deleteTag = async (): Promise<void> => {
      if (selectedTag.value != null) {
        await nfcTags.remove(selectedTag.value._id);
        selectedTag.value = null;
        buttonTransitionActive.value = true;
      }
    };

    const deselect = (): void => {
      selectedTag.value = null;
      buttonTransitionActive.value = true;
    };

    const loadTags = async (): Promise<void> => {
      const res = (await nfcTags.find()) as Paginated<NFCTag>;
      groups.value = Object.values(
        res.data.reduce((previous, item) => {
          if (!previous[item.group]) {
            previous[item.group] = { name: item.group, tags: [] } as NFCTagGroup;
          }
          previous[item.group].tags.push(item);
          return previous;
        }, {} as Record<string, NFCTagGroup>)
      );
    };

    const onRemove = (tag: NFCTag): void => {
      groups.value = groups.value
        .map((group) => {
          const filteredGroup = group;
          filteredGroup.tags = group.tags.filter((t) => t._id !== tag._id);
          return filteredGroup;
        })
        .filter((group) => group.tags.length !== 0);
    };

    onMounted(async () => {
      await loadTags();
      nfcTags.on('removed', onRemove);
    });

    onBeforeUnmount(() => {
      nfcTags.off('removed', onRemove);
    });

    return {
      groups,
      selectedTag,
      toggleSelectedTag,
      deleteTag,
      infoTransitionActive,
      buttonTransitionActive,
      deselect,
      searchInput,
    };
  },
});
</script>

<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.slide-leave-to,
.slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
</style>
