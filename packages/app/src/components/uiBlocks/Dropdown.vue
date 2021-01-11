<template>
  <div class="relative h-10 min-w-min">
    <span v-if="label" class="ml-6 text-base text-white font-heading">{{ label }}</span>
    <div
      class="bg-white p-1 pr-3 rounded-3xl w-full flex flex-col text-lg border-button shadow-lg border-2 outline-none"
      :class="{ 'z-50': dropdownExtended }"
    >
      <div class="flex items-center pl-2" @click="dropdownExtended = !dropdownExtended">
        <span class="">{{ getHeaderText() }}</span>
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
        <div v-for="(item, index) in selectableItemValues" :key="index">
          <hr class="w-full border-dotted border-secondary border-1 my-2" />
          <div id="item" class="flex w-full">
            <span class="px-2 rounded-2xl hover:bg-yellow-200" @click="itemClick(item)">
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
        <div v-if="addItemOption" class="">
          <hr class="w-full border-solid border-secondary border-1 my-2" />
          <div id="addItemSection" class="flex w-full items-center pt-0.5">
            <input
              v-model="newItemValue"
              class="p-2 rounded-2xl focus:outline-none"
              :placeholder="addItemText"
            />
            <Button
              class="ml-auto w-8 h-8"
              icon="fas fa-plus"
              :icon-size="3"
              round
              @click="addItem()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Service } from '@feathersjs/feathers';
import { AbstractEntity } from '@leek/commons';
import { defineComponent, onMounted, ref } from 'vue';

import feathers from '../../lib/feathers';
import Button from './Button.vue';
import ListItem from './Dropdown.ListItem';

export default defineComponent({
  name: 'Dropdown',
  components: { Button },
  props: {
    service: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
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
    valueProperty: {
      type: String,
      required: false,
      default: 'value',
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
  },

  emits: ['update:modelValue'],
  setup(props, ctx) {
    const selectedItem = ref<string>(props.modelValue);
    const dropdownExtended = ref<boolean>(false);
    const selectableItemValues = ref<ListItem[]>([]);
    const newItemValue = ref<string>('');

    const service = feathers.service(props.service) as Service<AbstractEntity>;

    function getProperty(arr: AbstractEntity[], property: string): ListItem[] {
      const res: ListItem[];
      arr.forEach((element) => {
        const li = {
          id: element._id,
          value: element[property] as string,
        };

        res.push(li);
      });

      return res;
    }

    async function loadItems() {
      const allValues = await service.find();
      if (allValues && allValues.data) {
        selectableItemValues.value = getProperty(allValues.data, props.valueProperty);
      }
    }

    onMounted(async () => {
      await loadItems();
    });

    function itemClick(item: ListItem) {
      selectedItem.value.id = item.id;
      selectedItem.value.value = item.value;
      dropdownExtended.value = false;
      ctx.emit('update:modelValue', item);
    }

    function getHeaderText(): string {
      if (selectedItem.value == null || selectedItem.value === '') {
        return props.placeholderText;
      }
      return selectedItem.value.value as string;
    }

    async function addItem() {
      const newItem = {};
      newItem[props.valueProperty] = newItemValue.value;
      await service.create(newItem).data;
      newItemValue.value = '';
      await loadItems();
    }

    async function removeItem(item: ListItem) {
      if (item.id === selectedItem.value.id) {
        selectedItem.value = new ListItem();
        ctx.emit('update:modelValue', selectedItem.value);
      }
      await service.remove(item.id);
      await loadItems();
    }

    return {
      itemClick,
      getHeaderText,
      addItem,
      removeItem,
      dropdownExtended,
      selectableItemValues,
      newItemValue,
    };
  },
});
</script>
