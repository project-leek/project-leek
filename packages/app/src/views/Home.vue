<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
    <header class="h-1/5 flex items-end justify-center text-4xl text-gray-800">
      <Button
        icon="fas fa-plus-square"
        text="Hinzufügen"
        :textSize="2"
        class="w-10/12 py-2 pl-3 mb-6 justify-start"
      />
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
import Button from '../components/uiBlocks/Button.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Button,
  },
  setup() {
    return {};
  },
});
</script>
