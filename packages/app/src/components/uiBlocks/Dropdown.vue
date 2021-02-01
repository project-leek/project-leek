<template>
  <div class="w-full flex flex-col text-lg relative">
    <div
      class="bg-white p-2 px-1.5 rounded-3xl flex items-center pl-2 cursor-pointer border-button shadow-lg border-2 outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-25"
      :class="{
        'rounded-b-none': dropdownExtended,
        'ring-red-600 ring-2 ring-inset': required && !modelValue,
      }"
      @click="dropdownExtended = !dropdownExtended"
    >
      <span v-if="modelValue && modelValue.value" class="value text-xl">
        {{ modelValue.value }}
      </span>
      <span v-else class="ml-3 placeholder text-gray-400">{{ placeholderText }}</span>
      <Button
        v-if="dropdownExtended"
        class="ml-auto mr-3 w-8 h-8"
        icon="fas fa-chevron-down"
        :icon-size="3"
        round
      />
      <Button
        v-else
        class="ml-auto mr-3 w-8 h-8"
        icon="fas fa-chevron-right"
        :icon-size="3"
        round
      />
    </div>
    <div
      v-if="dropdownExtended"
      class="absolute px-0.5 bg-white rounded-b-3xl w-full top-full -mt-0.5 z-50 border-2 border-button"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="py-2 px-1.5 w-full border-dotted border-secondary border-b outline-none"
      >
        <div
          :class="{ 'bg-yellow-400': modelValue && modelValue.id === item.id }"
          class="item flex w-full cursor-pointer hover:bg-yellow-200 rounded-2xl"
          @click="selectItem(item)"
        >
          <span class="px-2 text-xl">{{ item.value }}</span>
          <Button
            v-if="removeable"
            class="w-8 h-8 ml-auto mr-3"
            icon="far fa-trash-alt"
            :icon-size="3"
            round
            @click="removeItem(item)"
          />
        </div>
      </div>
      <div v-if="enableAddItem" class="add-item px-4 py-2 border-solid border-secondary border-t">
        <div class="add-item-section flex w-full items-center pt-0.5">
          <input
            v-model="newItemValue"
            :placeholder="addItemText"
            class="flex-grow p-1 rounded-2xl focus:outline-none"
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
      default: 'Bitte wähle ein Element...',
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
      default: 'Bitte füge ein Element hinzu...',
    },
    items: {
      type: Array as PropType<ListItem[]>,
      default: (): ListItem[] => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:model-value': (_payload: ListItem | null): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:items': (_payload: ListItem[]): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'remove-item': (_payload: ListItem): boolean => true,
  },

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
