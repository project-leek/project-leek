<template>
  <div class="relative h-10 min-w-min">
    <div
      class="absolute bg-white rounded-2xl p-0.5 px-1 w-full flex flex-col text-lg border-button shadow-lg border-2 divide-y-2 divide-yellow-50 outline-none"
      :class="{ 'z-50': dropdownExtended }"
    >
      <div class="flex w-full items-center pl-2" @click="dropdownExtended = !dropdownExtended">
        <span class="flex-1">{{ getHeaderText() }}</span>
        <img
          v-if="dropdownExtended"
          class="flex-none bg-gradient-to-b from-primary to-secondary rounded-full p-0.5 mt-0.5 ml-2 w-6 h-6 justify-end self-start"
          src="../../assets/icons/chevron-down.svg"
        />
        <img
          v-else
          class="flex-none bg-gradient-to-b from-primary to-secondary rounded-full p-0.5 mt-0.5 ml-2 w-6 h-6 justify-end self-start"
          src="../../assets/icons/chevron-right.svg"
        />
      </div>
      <div v-if="dropdownExtended" class="divide-y divide-yellow-50 mr-6 static z-50">
        <div
          v-for="(item, index) in selectableItemValues"
          :key="index"
          class="flex w-full pl-2 rounded-2xl hover:bg-yellow-200"
          @click="itemClick(item)"
        >
          <span class="hidden"> {{ item.id }} </span>
          <span>{{ item.value }}</span>
          <Button class="w-1 h-1" text="+" />
        </div>
        <div
          v-if="addItemOption"
          class="flex w-full items-center pt-0.5 rounded-2xl hover:bg-yellow-200"
        >
          <img
            class="bg-gradient-to-b from-primary to-secondary rounded-full p-0.5 mr-2 h-6"
            src="../../assets/icons/plus.svg"
            @click="addItem()"
          />
          <input v-model="newItemValue" class="" :placeholder="addItemText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import feathers from '../../lib/feathers';
import Button from './Button.vue';

export default defineComponent({
  name: 'Dropdown',
  components: { Button },
  props: {
    service: {
      type: String,
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
    addTargetProperty: {
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
    const currentlySelectedItemValue = ref(props.modelValue);
    const dropdownExtended = ref(false);
    const selectableItemValues = ref([{ id: 0, value: '' }]);
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

    onMounted(async () => {
      const allValues = (await feathers.service(props.service).find()).data;
      selectableItemValues.value = getProperty(allValues, props.addTargetProperty);
    });

    function itemClick(itemValue: number) {
      currentlySelectedItemValue.value = itemValue.value;
      dropdownExtended.value = false;
      this.$emit('update:modelValue', itemValue);
    }

    function getHeaderText() {
      if (currentlySelectedItemValue.value == null || currentlySelectedItemValue.value === '') {
        return props.placeholderText;
      }
      return currentlySelectedItemValue.value;
    }

    async function addItem() {
      const newItem = {};
      newItem[props.addTargetProperty] = newItemValue.value;
      const result = await feathers.service(props.service).create(newItem).data;
      return result;
    }

    async function removeItem() {

    }

    return {
      addItem,
      itemClick,
      getHeaderText,
      dropdownExtended,
      selectableItemValues,
      newItemValue,
    };
  },
});
</script>
