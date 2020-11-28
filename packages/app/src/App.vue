<template>
  <div class="app flex">
    <ApiTest />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiTest from './components/SpotifyTest.vue';

export default defineComponent({
  name: 'App',
  components: {
    ApiTest,
  },
});
</script>

<style lang="css">
.app {
  height: 100vh;
}
</style>
