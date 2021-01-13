<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';

export default defineComponent({
  setup() {
    const itemCount = ref<number>(0);
    const activeItemIndex = ref<number | null>(null);
    provide('itemCount', itemCount);
    provide('activeItemIndex', activeItemIndex);
    return {
      itemCount,
      activeItemIndex
    }
  },
});
</script>
