<template>
  <div
    class="w-full flex flex-col bg-gradient-to-b from-darkBlue to-darkViolet h-64"
    :class="{ animateSmall: !isOpen }"
  >
    <div class="text-white w-full text-xl font-bold h-1/5 flex items-center pl-5 pt-4">
      <span> {{ groupname }} </span>
      <Button
        round
        icon="fas fa-chevron-down"
        class="ml-auto mr-5 h-8 w-8 bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30"
        @click="close"
      />
    </div>
    <div id="carousel" class="flex flex-row flex-grow content-start pt-5 overflow-x-auto">
      <slot />
    </div>
  </div>

  <div class="text-xl text-white font-bold flex flex-row bg-secondary py-4">
    <div class="pl-5">
      {{ groupname }}
    </div>
    <Button
      round
      icon="fas fa-chevron-right"
      class="ml-auto mr-5 h-8 w-8 bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30"
      @click="open"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref } from 'vue';

import Button from './Button.vue';

export default defineComponent({
  components: {
    Button,
  },

  props: {
    groupname: {
      type: String,
      required: true,
      default: '',
    },
  },

  setup() {
    let itemIndex = ref<number | null>(null);
    const itemCount = inject<Ref<number>>('itemCount');
    const activeItemIndex = inject<Ref<number | null>>('activeItemIndex');

    const isOpen = computed(() => {
      return activeItemIndex && activeItemIndex.value === itemIndex.value;
    });

    if (activeItemIndex === undefined)
      throw new Error(' du bist schlecht und musst sauber programmieren!');

    onMounted(() => {
      if (itemCount) itemIndex.value = ++itemCount.value;
    });

    const close = (): void => {
      if (activeItemIndex) activeItemIndex.value = null;
    };

    const open = (): void => {
      if (activeItemIndex) activeItemIndex.value = itemIndex.value;
    };

    return {
      isOpen,
      close,
      open,
      itemIndex,
      itemCount,
      activeItemIndex,
    };
  },
});
</script>

<style lang="css">
.animateSmall {
  height: 0;
}
</style>
