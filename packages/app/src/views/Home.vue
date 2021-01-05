<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="h-1/5 bg-blue-300 flex items-center justify-center text-4xl text-gray-800">
      header
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex flex-col items-center justify-center text-4xl text-gray-800"
    >
      <tag-group-selector v-model="testGroupId" />
      {{ testGroupId }}
      {{ searchInput }}
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Textfield v-model="searchInput" class="w-5/6" placeholder="Titelsuche" icon="search" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import TagGroupSelector from '../components/tagDetails/tagGroupSelector.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Textfield,
    TagGroupSelector,
  },
  setup() {
    const searchInput = ref('');
    const testGroupId = ref<string>();

    return { searchInput, testGroupId };
  },
});
</script>
