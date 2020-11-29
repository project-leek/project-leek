<template>
  <ApiTest />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiTest from '../components/SpotifyTest.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ApiTest,
  },
});
</script>
