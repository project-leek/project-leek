<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
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
      <div class="w-full bg-blue-900 h-64">
        <div class="text-white text-2xl pl-10 pb-2">Zuletzt gehört</div>
        <tag-entry class="bg-opacity-20 bg-white w-32" name="Dynamite" img="logo.png" />
      </div>

      <Dropdown
        v-model="selValue"
        class="w-3/4 h-20"
        service="nfc-tags"
        value-property="nfcId"
        label = "NFC-Tag"
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
import Textfield from '../components/uiBlocks/Textfield.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';
import Dropdown, { ListItem } from '../components/uiBlocks/Dropdown.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Textfield,
    TagEntry,
    Dropdown,
  },
  setup() {
    const searchInput = ref('');
    const selValue = ref(new ListItem());
    return { searchInput, selValue };
  },
});
</script>
