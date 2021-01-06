<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="h-1/5 flex items-center justify-center text-4xl text-gray-800">header</header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex flex-col text-4xl text-gray-800"
    >
      <div class="w-full bg-blue-900 h-64">
        <div class="text-white text-2xl pl-10 pb-2">Zuletzt gehört</div>
        <tag-entry class="bg-opacity-20 bg-white w-32" name="Dynamite" img="logo.png" />
      </div>
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Textfield v-model="searchInput" class="w-5/6" placeholder="Titelsuche" icon="search" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import TagEntry from '../components/uiBlocks/TagEntry.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Textfield,
    TagEntry,
  },
  setup() {
    const searchInput = ref('');
    return { searchInput };
  },
});
</script>
