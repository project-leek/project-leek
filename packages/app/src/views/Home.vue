<template>
  <div class="home w-full flex flex-col">
    <header class="flex py-5 justify-center text-4xl overlay">
      <Button
        :to="{ name: 'add-tag' }"
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="5"
        class="py-2 mx-4 flex-grow"
      />
    </header>

    <main class="bg-secondary max-h-full overflow-y-auto flex-grow">
      <GroupDropDown>
        <GroupDropDownItem
          v-for="group in groups"
          :key="group.name"
          :groupname="group.name"
          class="border-white border-b"
        >
          <div class="flex flex-row content-start overflow-auto">
            <TagEntry
              v-for="entry in group.tags"
              :key="entry.nfcData"
              class="m-4 w-2/6 flex-shrink-0 text-4xl"
              :class="{ 'opacity-25': selectedTag !== entry && selectedTag !== null }"
              :img="entry.imageUrl"
              :name="entry.name"
              @click="toggleTag(entry)"
            />
          </div>
        </GroupDropDownItem>
      </GroupDropDown>
    </main>
    <footer class="flex text-gray-800 py-5">
      <transition name="fade" mode="out-in">
        <span v-if="!selectedTag" key="love" class="text-xl text-center w-full"
          >&copy; {{ new Date().getFullYear() }} - Made with ❤️ by
          <a class="underline" target="_blank" href="https://github.com/project-leek"
            >team leek</a
          ></span
        >
        <span v-else key="edit" class="flex justify-center w-full text-xl">
          <Button
            round
            icon="fas fa-times"
            class="ml-4 my-auto h-8 w-8 bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
            @click="selectedTag = null"
          />
          <Button
            round
            text="Bearbeiten"
            class="ml-4 px-3 text-2xl bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
          />
          <Button
            round
            text="Löschen"
            class="ml-4 px-3 text-2xl bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30 focus: outline-none"
          />
        </span>
      </transition>
    </footer>
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import GroupDropDown from '../components/uiBlocks/GroupDropDown.vue';
import GroupDropDownItem from '../components/uiBlocks/GroupDropDownItem.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
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
  },

  setup() {
    const groups = ref<NFCTagGroup[]>([]);
    const selectedTag = ref<NFCTag | null>(null);

    const toggleTag = (tag: NFCTag): void => {
      selectedTag.value = tag === selectedTag.value ? null : tag;
    };

    onMounted(async () => {
      const res = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;

      groups.value = Object.values(
        res.data.reduce((previous, item) => {
          if (!previous[item.group]) {
            previous[item.group] = { name: item.group, tags: [] } as NFCTagGroup;
          }
          previous[item.group].tags.push(item);
          return previous;
        }, {} as Record<string, NFCTagGroup>)
      );
    });
    return { groups, selectedTag, toggleTag };
  },
});
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateY(100%);
}

/* .fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
} */
</style>
