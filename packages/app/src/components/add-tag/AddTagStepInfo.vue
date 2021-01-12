<template>
  <div
    class="bg-gradient-to-b from-primary to-secondary w-full py-5 h-full flex flex-col items-center"
  >
    <textfield
      v-model="test"
      placeholder="e.g. mario figurine"
      label="Tag Name"
      class="bg-white rounded-full w-11/12"
      @update="setTagName()"
    />
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/';
import { defineComponent, PropType, reactive, ref } from 'vue';

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
    const tag = ref(props.modelValue.value);
    const test = ref<string>('');

    function setTagName() {
      $emit('update:modelValue', tag);
    }

    return {
      test,
      setTagName,
    };
  },
});
</script>
