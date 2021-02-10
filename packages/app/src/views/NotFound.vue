<template>
  <div
    class="flex flex-col w-full bg-gradient-to-b from-primary to-secondary justify-center items-center"
  >
    <img class="mb-8" src="/src/assets/not-found.gif" />
    <Button class="w-2/3" :to="{ name: 'home' }" text="Back to home" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from '../components/uiBlocks/Button.vue';

export default defineComponent({
  name: 'NotFound',
  components: {
    Button,
  },
});
</script>
