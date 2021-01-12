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
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
    <AddTagStepTrack />
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
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Textfield,
    AddTagStepTrack,
  },
  setup() {
    const searchInput = ref<string>('');
    const selValue = ref<ListItem>(new ListItem());
    return { searchInput, selValue };
  },
});
</script>
