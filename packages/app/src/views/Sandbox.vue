<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">Sandbox</header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      <AddTagStepImage />
    </main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      Footer
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AddTagStepImage from '../components/AddTagStepImage.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AddTagStepImage,
  },
  setup() {
    return {};
  },
});
</script>
