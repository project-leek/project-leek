<template>
  <div class="app flex">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import feathers from './lib/feathers';

export default defineComponent({
  name: 'App',
  setup() {
    onBeforeMount(async () => {
      try {
        await feathers.reAuthenticate();
      } catch (error) {
        console.error('authentication needed', error);
      }
    });

    return {};
  },
});
</script>

<style lang="css">
.app {
  height: 100vh;
}
</style>
