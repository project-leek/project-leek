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
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex flex-col text-4xl text-gray-800"
    >
      <div class="w-full flex flex-col bg-gradient-to-b from-darkBlue to-darkViolet h-64">
        <div class="text-white w-full text-xl h-1/5 flex items-center pl-10">
          <span> Zuletzt gehört </span>
          <Button round icon="fas fa-chevron-down" class="ml-auto mr-5 h-7 w-7 my-5" />
        </div>
        <div id="carousel" class="flex flex-row flex-grow content-start pt-5 overflow-x-auto">
          <tag-entry class="ml-8 w-32" name="City Song" img="stadt.jpg" />
          <tag-entry class="ml-8 w-32" name="City Song" img="stadt.jpg" />
          <tag-entry class="ml-8 w-32" name="City Song" img="stadt.jpg" />
        </div>
      </div>

      <Dropdown
        v-model="selValue"
        class="mx-auto w-3/4 h-20"
        service="nfc-tags"
        value-property="nfcId"
        label="NFC-Tag"
        add-item-option
      />
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Textfield v-model="searchInput" class="w-5/6" placeholder="Titelsuche" icon="search" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../components/uiBlocks/Dropdown.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Button,
    Textfield,
    TagEntry,
    Dropdown,
  },

  setup() {
    const searchInput = ref<string>('');
    const selValue = ref<ListItem>(new ListItem());

    return { searchInput, selValue };
  },
});
</script>
