<template>
  <div class="home w-full flex flex-col">
    <header class="flex p-4 text-4xl">
      <Button
        :to="{ name: 'tag-add' }"
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        class="flex-grow"
      />
      <Button :to="{ name: 'settings' }" icon="fas fa-cog" class="ml-4" />
    </header>

    <main
      class="bg-secondary max-h-full overflow-y-auto flex-grow bg-gradient-to-b from-primary to-secondary"
    >
      <GroupDropDown v-if="!searchInput">
        <GroupDropDownItem
          v-for="group in tagsOrderedByGroups"
          :key="group.name"
          :groupname="group.name"
          class="border-white border-b"
          @closed="selectedTag = null"
        >
          <div class="flex flex-row content-start overflow-auto">
            <TagEntry
              v-for="entry in group.tags"
              :key="entry.nfcData"
              class="m-4 w-44 flex-shrink-0 text-4xl"
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
          <Button icon="fas fa-times" class="ml-4" @click="deselect" />
          <Button
            text="Bearbeiten"
            class="flex-grow ml-4"
            :to="{ name: 'tag-details', params: { tagId: selectedTag._id } }"
          />
          <Button text="Löschen" class="flex-grow mx-4" @click="deleteTag" />
        </span>
      </transition>
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import GroupDropDown from '../components/uiBlocks/GroupDropDown.vue';
import GroupDropDownItem from '../components/uiBlocks/GroupDropDownItem.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import TagSearchResult from '../components/uiBlocks/TagSearchResult.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import feathers from '../compositions/useBackend';
import { loadTags, tagsOrderedByGroups } from '../compositions/useNfcTag';

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
    const selectedTag = ref<NFCTag | null>(null);
    const searchInput = ref<string>('');

    const toggleSelectedTag = (tag: NFCTag): void => {
      selectedTag.value = tag === selectedTag.value ? null : tag;
      buttonTransitionActive.value = true;
    };

    const infoTransitionActive = ref<boolean>(false);
    const buttonTransitionActive = ref<boolean>(false);

    const deleteTag = async (): Promise<void> => {
      if (selectedTag.value != null) {
        await feathers.service('nfc-tags').remove(selectedTag.value._id);
        selectedTag.value = null;
        buttonTransitionActive.value = true;
      }
    };

    const deselect = (): void => {
      selectedTag.value = null;
      buttonTransitionActive.value = true;
    };

    onMounted(async () => {
      await loadTags();
    });

    return {
      tagsOrderedByGroups,
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
  transition: all 0.25s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s;
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
