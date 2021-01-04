<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="h-1/5 bg-white flex items-center justify-center text-4xl text-gray-800">
      header
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-primary to-secondary flex items-center justify-center text-4xl text-gray-800"
    ></main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Button :text="'Speichern'" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '../components/uiBlocks/Button.vue';

export default defineComponent({
  name: 'Home',
  components: { Button },
  setup() {
    return {};
  },
});
</script>
