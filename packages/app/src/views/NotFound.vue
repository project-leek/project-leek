<template>
  <div class="m-auto">
    <router-link class="" :to="{ name: 'home' }">Back to home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>
