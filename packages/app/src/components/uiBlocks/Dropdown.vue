<template>
  <div
    class="bg-white p-1 pr-3 rounded-3xl w-full flex flex-col text-lg border-button shadow-lg border-2 outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-25"
    :class="{ 'z-50': dropdownExtended }"
  >
    <div
      class="flex items-center pl-2 cursor-pointer"
      @click="dropdownExtended = !dropdownExtended"
    >
      <span v-if="modelValue && modelValue.value" class="value">{{ modelValue.value }}</span>
      <span v-else class="placeholder text-gray-400">{{ placeholderText }}</span>
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
        <div
          :class="{ 'bg-yellow-400': modelValue && modelValue.id === item.id }"
          class="item flex w-full cursor-pointer hover:bg-yellow-200 rounded-2xl"
          @click="selectItem(item)"
        >
          <span class="px-2">{{ item.value }}</span>
          <Button
            v-if="removeable"
            class="w-8 h-8 ml-auto"
            icon="far fa-trash-alt"
            :icon-size="3"
            round
            @click="removeItem(item)"
          />
        </div>
      </div>
      <div v-if="enableAddItem" class="add-item">
        <hr class="w-full border-solid border-secondary border-1 my-2" />
        <div class="add-item-section flex w-full items-center pt-0.5">
          <input
            v-model="newItemValue"
            :placeholder="addItemText"
            class="flex-grow p-2 rounded-2xl focus:outline-none"
            @keyup.enter="addItem"
          />
          <Button class="w-8 h-8" icon="fas fa-plus" :icon-size="3" round @click="addItem" />
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
    enableAddItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    removeable: {
      type: Boolean,
      default: true,
    },
    addItemText: {
      type: String,
      required: false,
      default: 'Please add an element',
    },
    items: {
      type: Array as PropType<ListItem[]>,
      default: (): ListItem[] => [],
    },
  },

  emits: ['update:model-value', 'update:items', 'remove-item'],

  setup(props, ctx) {
    const dropdownExtended = ref<boolean>(false);
    const newItemValue = ref<string>('');

    function selectItem(item: ListItem): void {
      if (props.modelValue && props.modelValue.id === item.id) {
        ctx.emit('update:model-value', null);
      } else {
        ctx.emit('update:model-value', item);
      }

      dropdownExtended.value = false;
    }

    function addItem(): void {
      // skip empty inputs
      if (newItemValue.value === '') {
        return;
      }
      const newItem = new ListItem(newItemValue.value, newItemValue.value);
      ctx.emit('update:items', props.items.concat(newItem));
      ctx.emit('update:model-value', newItem);
      newItemValue.value = '';
      dropdownExtended.value = false;
    }

    function removeItem(item: ListItem): void {
      if (props.modelValue && item.id === props.modelValue.id) {
        ctx.emit('update:model-value', null);
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
