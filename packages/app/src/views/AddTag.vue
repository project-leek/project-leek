<template>
  <div class="add-tag">
    <pre>{{ nfcTag }}</pre>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddTag',

  setup() {
    const nfcTag = new NFCTag();

    return {
      nfcTag,
    };
  },
});
</script>

<style lang="css">
.app {
  height: 100vh;
}
</style>
