<template>
  <div class="bg-white rounded-2xl p-0.5 pr-1 pl-3 w-full flex flex-col border-yellow-400 border-2">
    <div class="group flex w-full items-center" @click="dropdownExtended = !dropdownExtended">
      <span class="flex-1">{{ getHeaderText() }}</span>
      <img
        v-if="dropdownExtended"
        class="flex-none bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full p-0.5 ml-2 w-5 h-5 justify-end"
        src="../../assets/icons/chevron-down.svg"
      />
      <img
        v-else
        class="flex-none bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full p-0.5 ml-2 w-5 h-5 justify-end"
        src="../../assets/icons/chevron-right.svg"
      />
    </div>
    <div v-if="dropdownExtended">
      <div v-for="(item, index) in itemData" :key="index" class="w-full" @click="itemClick(index)">
        {{ item }} {{ index }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Dropdown',
  props: {
    itemData: {
      type: Array,
      required: true,
    },
    selectedItemIndex: {
      type: Number,
      required: false,
      default: null,
    },
    placeholderText: {
      type: String,
      required: false,
      default: 'Please select an item',
    },
  },
  setup(props) {
    const currentlySelectedItemIndex = ref(props.selectedItemIndex);
    const dropdownExtended = ref(false);

    function itemClick(index: number) {
      currentlySelectedItemIndex.value = index;
      dropdownExtended.value = false;
    }

    function getHeaderText() {
      if (currentlySelectedItemIndex.value == null) {
        return props.placeholderText;
      }
      return props.itemData[currentlySelectedItemIndex.value];
    }

    return {
      itemClick,
      getHeaderText,
      dropdownExtended,
    };
  },
});
</script>
