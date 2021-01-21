<template>
  <div
    class="group-item w-full flex flex-col"
    :class="[isOpen && 'bg-gradient-to-b from-darkBlue to-darkViolet', !isOpen && 'bg-secondary']"
  >
    <div
      class="text-white w-full text-xl font-bold flex items-center p-4 cursor-pointer"
      @click="toggle"
    >
      <span>{{ groupname }}</span>
      <Button
        round
        :icon="`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`"
        class="ml-auto h-8 w-8 bg-gradient-to-b from-primary to-secondary ring-2 ring-yellow-300 ring-opacity-30 transition-all duration-700 focus: outline-none"
      />
    </div>
    <div
      class="group-content overflow-hidden transition-all ease-linear"
      :class="[isOpen && 'max-h-64', !isOpen && 'max-h-0']"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons/dist';
import { computed, defineComponent, inject, onMounted, Ref, ref, watch } from 'vue';

import Button from './Button.vue';

export default defineComponent({
  name: 'GroupDropdownItem',

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

  setup(props) {
    let itemIndex = ref<number | null>(null);
    const itemCount = inject<Ref<number>>('itemCount');
    const activeItemIndex = inject<Ref<number | null>>('activeItemIndex');
    const selectedTag = inject<Ref<NFCTag | null>>('selectedTag');

    if (!activeItemIndex || !itemCount) {
      throw new Error('reference injection failed');
    }

    const isOpen = computed(() => {
      return activeItemIndex && activeItemIndex.value === itemIndex.value;
    });

    onMounted(() => {
      if (!itemCount) {
        return;
      }

      itemIndex.value = itemCount.value;
      if (itemCount.value === 0) activeItemIndex.value = itemIndex.value;
      itemCount.value += 1;
    });

    const toggle = (): void => {
      if (!activeItemIndex) {
        return;
      }
      activeItemIndex.value = isOpen.value ? null : itemIndex.value;
    };

    watch(isOpen, (newVal) => {
      if (!newVal && selectedTag?.value?.group === props.groupname) selectedTag.value = null;
    });

    return {
      isOpen,
      toggle,
    };
  },
});
</script>
