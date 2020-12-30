<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col">
    <!-- this is a basic template to fill the divs with content. The divs already match roughly the sizes of the figma design -->
    <div class="h-1/5 bg-blue-300 flex items-center justify-center text-4xl text-gray-800">
      header
    </div>
    <div
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-yellow-300 flex items-center justify-center text-4xl text-gray-800"
    >
      content
    </div>
    <div class="flex-grow bg-red-300 flex items-center justify-center text-4xl text-gray-800">
      footer
    </div>
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
