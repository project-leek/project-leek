<template>
  <div class="m-auto">
    <!-- <router-link
      class="cursor-pointer bg-green-600 rounded-full text-center p-2 text-white"
      :to="{ name: 'home' }"
      >Back to home</router-link
    > -->
    <Button :to="{ name: 'home' }" text="Back to home" />
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
