<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 bg-blue-300 flex items-center justify-center text-4xl text-gray-800">
      header
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      content
    </main>
    <footer class="flex-grow bg-red-300 flex items-center justify-center text-4xl text-gray-800">
      footer
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    return {};
  },
});
</script>
