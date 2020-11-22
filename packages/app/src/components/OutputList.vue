<template>
  <div class="w-full h-full object-cover card bg-white shadow-2xl max-w-2xl">
    >
    <entry></entry>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import entry from './Entry.vue';

export default defineComponent({
  name: 'OutputList',
  components: {
    entry,
  },
  data() {
    return {};
  },
});
</script>
