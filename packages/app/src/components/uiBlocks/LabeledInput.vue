<template>
  <div class="labeled-input w-full flex flex-col">
    <span class="label font-bold ml-6 text-white">{{ label }}</span>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LabeledInput',

  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>
