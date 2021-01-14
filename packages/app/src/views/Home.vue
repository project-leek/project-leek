<template>
  <div class="home mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <Button
        :to="{ name: 'add-tag' }"
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="5"
        class="w-10/12 py-2 pl-3 mb-6 justify-start"
      />
    </header>
    <main class="h-2/3 overflow-x-hidden overflow-y-auto flex flex-col text-4xl text-gray-800">
      <GroupDropDown>
        <GroupDropDownItem v-for="group in groups" :groupname="group.name">
          <div class="flex flex-row flex-grow content-start p-2 overflow-x-auto">
            <tag-entry class="m-4 w-32" v-for="entry in group.children" :img="entry.imageUrl" :name="entry.name"/>
          </div>
        </GroupDropDownItem>
      </GroupDropDown>
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Textfield v-model="searchInput" class="w-5/6" placeholder="Titelsuche" icon="search" />
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
import Textfield from '../components/uiBlocks/Textfield.vue';
import feathers from '../lib/feathers';

class Group {
  name = '';
  children: NFCTag[] = [];
}

export default defineComponent({
  name: 'Home',

  components: {
    Button,
    Textfield,
    TagEntry,
    GroupDropDown,
    GroupDropDownItem,
  },

  setup() {
    const searchInput = ref<string>('');
    const groups = ref<Group[]>([]);
    onMounted(async () => {
      const res = (await feathers.service('nfc-tags').find()).data as NFCTag[];
      //if there is a group with the name of the current data,
      res.forEach((entry: NFCTag) => {
        let alreadyExists = false;
        groups.value.forEach((group) => {
          if (group.name === entry.group) {
            alreadyExists = true;
            //push into children
            group.children.push(entry);
          }
        });
        //else then create a new
        if (!alreadyExists) {
          let newGroup: Group = {
            name: entry.group,
            children: [entry],
          };
          groups.value.push(newGroup);
        }
      });
    });
    return { groups };
  },
});
</script>
