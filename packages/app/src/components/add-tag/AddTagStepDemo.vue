<template>
  <div class="add-tag-step-demo">
    <pre>{{ nfcTag }}</pre>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, PropType } from 'vue';

export default defineComponent({
  name: 'AddTagStepDemo',

  props: {
    nfcTag: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },

  emits: ['update:nfc-tag'],

  setup(props, ctx) {
    onMounted(() => {
      // create copy of nfc-tag
      const nfcTag = props.nfcTag;
      nfcTag.group = 'Mukke'; // TODO
      nfcTag.activeImageUrl =
        'http://www.nordseeinseln-infos.de/wp-content/uploads/Nordseeinseln_V%C3%B6gel_M%C3%B6wen_Sylt.jpg'; // TODO
      nfcTag.spotifyImageUrl =
        'http://www.nordseeinseln-infos.de/wp-content/uploads/Nordseeinseln_V%C3%B6gel_M%C3%B6wen_Sylt.jpg'; // TODO
      ctx.emit('update:nfc-tag', nfcTag);
    });
  },
});
</script>
