<template>
  <div
    class="bg-gradient-to-b from-primary to-secondary w-full py-5 h-full flex flex-col items-center"
  >
    <div class="w-11/12">
      <span class="text-base text-white text-left p-5">Tag Name</span>
      <textfield
        v-model="tag.name"
        placeholder="e.g. mario figurine"
        class="bg-white rounded-full"
        @update="$emit('update:modelValue', tag)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, ref } from 'vue';

import Textfield from '../uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'AddTagStepInfo',
  components: {
    Textfield,
  },
  props: {
    modelValue: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
  emits: { 'update:modelValue': null },
  setup(props) {
    const tag = ref(props.modelValue);

    return {
      tag,
    };
  },
});
</script>
