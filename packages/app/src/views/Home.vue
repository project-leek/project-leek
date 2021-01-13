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
        <GroupDropDownItem groupname="Zuletzt gehört">
          <div class="flex flex-row flex-grow content-start p-2 overflow-x-auto">
            <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
            <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
            <tag-entry class="m-4 w-32" img="./stadt.jpg" />
            <tag-entry class="m-4 w-32" img="./stadt.jpg" />
          </div>
        </GroupDropDownItem>
        <GroupDropDownItem groupname="Zuletzt gehört">
          <div class="flex flex-row flex-grow content-start p-2 overflow-x-auto">
            <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
            <tag-entry class="m-4 w-32" name="City Song" img="./stadt.jpg" />
            <tag-entry class="m-4 w-32" img="./stadt.jpg" />
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
import { defineComponent, ref } from 'vue';

import AddTagStepTrack from '../components/addTag/AddTagStepTrack.vue';
import Button from '../components/uiBlocks/Button.vue';
import GroupDropDown from '../components/uiBlocks/GroupDropDown.vue';
import GroupDropDownItem from '../components/uiBlocks/GroupDropDownItem.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';

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

    return { searchInput };
  },
});
</script>
