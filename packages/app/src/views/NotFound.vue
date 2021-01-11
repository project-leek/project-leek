<template>
  <div class="m-auto">
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
