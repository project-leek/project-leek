<template>
  <div class="m-auto">
    <router-link
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      :to="{ name: 'home' }"
      >Back to home</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>
