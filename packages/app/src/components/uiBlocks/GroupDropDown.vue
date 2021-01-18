<template>
  <div class="group">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';

export default defineComponent({
  name: 'GroupDropdown',

  setup() {
    const itemCount = ref<number>(0);
    const activeItemIndex = ref<number | null>(null);

    provide('itemCount', itemCount);
    provide('activeItemIndex', activeItemIndex);
  },
});
</script>
