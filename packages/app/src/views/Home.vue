<template>
  <div class="home w-full flex flex-col">
    <header class="flex py-5 justify-center text-4xl overlay" :class="{ blurred: selectedTag }">
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
              :img="entry.imageUrl"
              :name="entry.name"
              @click="selectedTag = entry"
            />
          </div>
        </GroupDropDownItem>
      </GroupDropDown>
    </main>
    <footer class="flex text-gray-800 py-5">
      <span class="text-xl text-center w-full"
        >&copy; {{ new Date().getFullYear() }} - Made with ❤️ by
        <a class="underline" target="_blank" href="https://github.com/project-leek"
          >team leek</a
        ></span
      >
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

    return { groups, selectedTag };
  },
});
</script>

<style lang="css" scoped>
.overlay {
  position: relative;
}

.overlay.blurred::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}
</style>
