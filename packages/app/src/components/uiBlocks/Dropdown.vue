<template>
  <div class="relative h-10 min-w-min">
    <span v-if="label" class="ml-6 text-base text-white font-heading">{{ label }}</span>
    <div
      class="bg-white p-1 pr-3 rounded-3xl w-full flex flex-col text-lg border-button shadow-lg border-2 outline-none"
      :class="{ 'z-50': dropdownExtended }"
    >
      <div class="flex items-center pl-2" @click="dropdownExtended = !dropdownExtended">
        <span class="label">{{ (modelValue && modelValue.value) || placeholderText }}</span>
        <Button
          v-if="dropdownExtended"
          class="ml-auto w-8 h-8"
          icon="fas fa-chevron-down"
          :icon-size="3"
          round
        />
        <Button v-else class="ml-auto w-8 h-8" icon="fas fa-chevron-right" :icon-size="3" round />
      </div>
      <div v-if="dropdownExtended" class="divide-y divide-yellow-50 static z-50">
        <div v-for="item in items" :key="item.id">
          <hr class="w-full border-dotted border-secondary border-1 my-2" />
          <div class="item flex w-full">
            <span class="px-2 rounded-2xl hover:bg-yellow-200" @click="selectItem(item)">
              {{ item.value }}
            </span>
            <Button
              class="w-8 h-8 ml-auto"
              icon="far fa-trash-alt"
              :icon-size="3"
              round
              @click="removeItem(item)"
            />
          </div>
        </div>
        <div v-if="addItemOption" class="add-item">
          <hr class="w-full border-solid border-secondary border-1 my-2" />
          <div class="add-item-section flex w-full items-center pt-0.5">
            <input
              v-model="newItemValue"
              :placeholder="addItemText"
              @keyup.enter="addItem"
              class="flex-grow p-2 rounded-2xl focus:outline-none"
            />
            <Button class="w-8 h-8" icon="fas fa-plus" :icon-size="3" round @click="addItem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import Button from './Button.vue';
import ListItem from './Dropdown.ListItem';

export default defineComponent({
  name: 'Dropdown',

  components: { Button },

  props: {
    modelValue: {
      type: Object as PropType<ListItem | null>,
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
    label: {
      type: String,
      required: false,
      default: '',
    },
    items: {
      type: Array as PropType<ListItem[]>,
      default: (): ListItem[] => [],
    },
  },

  emits: ['update:modelValue', 'add-item', 'remove-item'],

  setup(props, ctx) {
    const dropdownExtended = ref<boolean>(false);
    const newItemValue = ref<string>('');

    function selectItem(item: ListItem): void {
      ctx.emit('update:modelValue', item);
    }

    function addItem(): void {
      // skip empty inputs
      if (newItemValue.value === '') {
        return;
      }

      ctx.emit('add-item', newItemValue.value);
      newItemValue.value = '';
    }

    function removeItem(item: ListItem): void {
      if (props.modelValue && item.id === props.modelValue.id) {
        ctx.emit('update:modelValue', null);
      }

      ctx.emit('remove-item', item);
    }

    return {
      selectItem,
      addItem,
      removeItem,
      dropdownExtended,
      newItemValue,
    };
  },
});
</script>
