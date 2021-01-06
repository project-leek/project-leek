<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <Button
        icon="fas fa-plus-square"
        text="Tag hinzufügen"
        :text-size="2"
        class="w-10/12 py-2 pl-3 mb-6 justify-start"
      />
      {{ selValue.id }}
      {{ selValue.value }}
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      {{ searchInput }}

      <Dropdown
        v-model="selValue"
        class="w-full h-20"
        service="nfc-tags"
        value-property="nfcId"
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
import Dropdown, { ListItem } from '../components/uiBlocks/Dropdown.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Textfield,
    Dropdown,
  },
  setup() {
    const searchInput = ref('');
    const selValue = ref(new ListItem());
    return { searchInput, selValue };
  },
});
</script>
