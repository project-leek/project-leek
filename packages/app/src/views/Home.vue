<template>
  <div class="app mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <Button
        :to="{ name: 'add-tag' }"
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="5"
        class="w-10/12 py-2 pl-3 mb-6 justify-start"
      />
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      <Dropdown
        v-model="selValue"
        class="w-3/4 h-20"
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
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Button,
    Textfield,
    Dropdown,
  },

  setup() {
    const searchInput = ref<string>('');
    const selValue = ref<ListItem>(new ListItem());

    return { searchInput, selValue };
  },
});
</script>
