<template>
  <div class="app">
    <hello-world />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
});
</script>

<style lang="css">
.app {
  height: 100vh;
}
</style>
