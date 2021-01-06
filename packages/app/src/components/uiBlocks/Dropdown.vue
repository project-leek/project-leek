<template>
  <div class="relative h-10 min-w-min">
    <div
      class="absolute bg-white rounded-2xl p-0.5 px-1 w-full flex flex-col text-lg border-button shadow-lg border-2 divide-y-2 divide-yellow-50 outline-none"
      :class="{ 'z-50': dropdownExtended }"
    >
      <div class="flex w-full items-center pl-2" @click="dropdownExtended = !dropdownExtended">
        <span class="flex-1">{{ getHeaderText() }}</span>
        <Button
          v-if="dropdownExtended"
          class="flex-none rounded-full"
          icon="fas fa-chevron-down"
          :icon-size="1"
        />
        <Button v-else class="flex-none rounded-full" icon="fas fa-chevron-right" :icon-size="1" />
      </div>
      <div v-if="dropdownExtended" class="divide-y divide-yellow-50 mr-6 static z-50">
        <div v-for="(item, index) in selectableItemValues" :key="index">
          <hr class="w-full border-dotted border-secondary border-1 my-2" />
          <div id="item" class="flex w-full my-1">
            <span class="hidden"> {{ item.id }} </span>
            <span class="flex-1 px-2 rounded-2xl hover:bg-yellow-200" @click="itemClick(item)">
              {{ item.value }}
            </span>
            <Button
              class="w-12 justify-self-end"
              icon="far fa-trash-alt"
              :icon-size="1"
              @click="removeItem(item)"
            />
          </div>
        </div>
        <div v-if="addItemOption" class="">
          <hr class="w-full border-solid border-secondary border-1 my-2" />
          <div id="addItemSection" class="flex w-full items-center pt-0.5">
            <input
              v-model="newItemValue"
              class="flex-1 px-2 rounded-2xl"
              :placeholder="addItemText"
            />
            <Button
              class="w-12 justify-self-end"
              icon="fas fa-plus"
              :icon-size="1"
              @click="addItem()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import feathers from '../../lib/feathers';
import Button from './Button.vue';

export class ListItem {
  id: number | null;

  value: string | null;

  constructor(id?: number, val?: string) {
    this.id = id || null;
    this.value = val || null;
  }
}

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
  },
  emits: ['update:modelValue'],
  setup(props) {
    const selectedItem = ref(props.modelValue);
    const dropdownExtended = ref(false);
    const selectableItemValues = ref([]);
    const newItemValue = ref('');

    function getProperty(arr: Array, property: string) {
      const res = [];
      arr.forEach((element) => {
        const tmp = {
          id: element._id,
          value: element[property],
        };

        res.push(tmp);
      });

      return res;
    }

    async function loadItems() {
      const allValues = (await feathers.service(props.service).find()).data;
      if (allValues) {
        selectableItemValues.value = getProperty(allValues, props.valueProperty);
      }
    }

    onMounted(async () => {
      await loadItems();
    });

    function itemClick(item: ListItem) {
      selectedItem.value.id = item.id;
      selectedItem.value.value = item.value;
      dropdownExtended.value = false;
      this.$emit('update:modelValue', item);
    }

    function getHeaderText() {
      if (selectedItem.value == null || selectedItem.value === '') {
        return props.placeholderText;
      }
      return selectedItem.value.value;
    }

    async function addItem() {
      const newItem = {};
      newItem[props.valueProperty] = newItemValue.value;
      const res = await feathers.service(props.service).create(newItem).data;
      newItemValue.value = '';
      await loadItems();
    }

    async function removeItem(item) {
      if (item.id === selectedItem.value.id) {
        selectedItem.value = new ListItem();
      }
      await feathers.service(props.service).remove(item.id);
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
