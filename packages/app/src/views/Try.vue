<template>
  <div class="bg-green-400 w-full h-full bg-gradient-to-b from-primary to-secondary" style="width:375px; height:424px;">
    <AddTagStepTrack :tag="tag" />
  </div>
</template>

<script>
import { NFCTag } from '@leek/commons';
import { defineComponent } from 'vue';

import AddTagStepTrack from '../components/addTag/AddTagStepTrack.vue';

export default defineComponent({
  name: 'Try',
  components: {
    AddTagStepTrack,
  },
  setup() {
    const tag = new NFCTag();
    return {
      tag,
    };
  },
});
</script>
<style></style>
