<template>
  <div class="home mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <Button
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="5"
        class="w-10/12 py-2 pl-3 mb-6 justify-start"
      />
    </header>
    <main class="h-2/3 overflow-x-hidden overflow-y-auto flex flex-col text-4xl text-gray-800">
      <GroupDropDownList>
        <GroupDropDown groupname="Zuletzt gehört">
          <tag-entry class="ml-8 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="ml-8 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="ml-8 w-32" img="./stadt.jpg" />
        </GroupDropDown>
        <GroupDropDown groupname="Zuletzt gehört">
          <tag-entry class="ml-8 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="ml-8 w-32" name="City Song" img="./stadt.jpg" />
          <tag-entry class="ml-8 w-32" img="./stadt.jpg" />
        </GroupDropDown>
      </GroupDropDownList>
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Textfield v-model="searchInput" class="w-5/6" placeholder="Titelsuche" icon="search" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import GroupDropDown from '../components/uiBlocks/GroupDropDown.vue';
import GroupDropDownList from '../components/uiBlocks/GroupDropDownList.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Button,
    Textfield,
    TagEntry,
    GroupDropDown,
    GroupDropDownList,
  },

  setup() {
    const searchInput = ref<string>('');

    return { searchInput };
  },
});
</script>
