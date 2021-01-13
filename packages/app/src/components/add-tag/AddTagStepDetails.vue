<template>
  <div class="add-tag-step-details">
    <pre>{{ modelValue }}</pre>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<NFCTag>,
      required: true,
    },
  },
});
</script>
