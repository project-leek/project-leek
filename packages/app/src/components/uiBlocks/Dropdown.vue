<template>
  <div class="relative h-10 min-w-min">
    <div
      class="absolute bg-white rounded-2xl p-0.5 px-1 w-full flex flex-col text-lg border-yellow-400 shadow-lg border-2 divide-y-2 divide-yellow-50 outline-none"
      :class="{ 'z-50': dropdownExtended }"
      tabindex="0"
      @focusout="dropdownExtended = false"
    >
      <div class="flex w-full items-center pl-2" @click="dropdownExtended = !dropdownExtended">
        <span class="flex-1">{{ getHeaderText() }}</span>
        <img
          v-if="dropdownExtended"
          class="flex-none bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full p-0.5 mt-0.5 ml-2 w-6 h-6 justify-end self-start"
          src="../../assets/icons/chevron-down.svg"
        />
        <img
          v-else
          class="flex-none bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full p-0.5 mt-0.5 ml-2 w-6 h-6 justify-end self-start"
          src="../../assets/icons/chevron-right.svg"
        />
      </div>
      <div v-if="dropdownExtended" class="divide-y divide-yellow-50 mr-6 static z-50">
        <div
          v-for="(item, index) in selectableItemValues"
          :key="index"
          class="w-full pl-2 rounded-2xl hover:bg-yellow-200"
          @click="itemClick(item)"
        >
          {{ item }}
        </div>
        <div
          v-if="addItemOption"
          class="flex w-full items-center pt-0.5 rounded-2xl hover:bg-yellow-200"
          @click="addItem()"
        >
          <img
            class="flex-none bg-gradient-to-b from-yellow-500 to-yellow-300 rounded-full p-0.5 mr-2 w-5 h-5 justify-start"
            src="../../assets/icons/plus.svg"
          />
          <span class="flex-1">{{ addItemText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Dropdown',
  props: {
    selectableItemValues: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
    placeholderText: {
      type: String,
      required: false,
      default: 'Please select an item',
    },
    addItemOption: {
      type: Boolean,
      required: false,
      default: false,
    },
    addItemText: {
      type: String,
      required: false,
      default: 'Please add an element',
    },
    addItemRedirectTo: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const currentlySelectedItemValue = ref(props.modelValue);
    const dropdownExtended = ref(false);
    const router = useRouter();

    function itemClick(itemValue: number) {
      currentlySelectedItemValue.value = itemValue;
      dropdownExtended.value = false;
      this.$emit('update:modelValue', itemValue);
    }

    function getHeaderText() {
      if (currentlySelectedItemValue.value == null) {
        return props.placeholderText;
      }
      return currentlySelectedItemValue.value;
    }

    function addItem() {
      router.push(props.addItemRedirectTo);
    }

    return {
      addItem,
      itemClick,
      getHeaderText,
      dropdownExtended,
    };
  },
});
</script>
