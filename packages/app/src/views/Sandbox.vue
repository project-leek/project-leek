<template>
  <div class="w-full h-full bg-red-500">
    <h1 class="text-3xl text-center bg-primary py-2">Sandbox</h1>
    <div class="p-2">
      <!-- Dropdown -->
      <h1 class="text-2xl text-center bg-secondary py-1">Dropdown</h1>
      <Dropdown
        v-model="dropdownValue"
        class="mb-5 h-20"
        label="NFC-Tag"
        enable-add-item
        :items="dropdownItems"
        @add-item="addDropdownItem"
        @remove-item="removeDropdownItem"
      />

      <!-- Button -->
      <h1 class="text-2xl text-center bg-secondary py-1">Buttons</h1>
      <Button class="w-full h-15 my-5" text="Drück mich!" />
      <Button class="w-full h-20 my-5" :icon-size="4" icon="fas fa-sun" text="Drück mich!" />
      <Button class="w-full h-15 my-5" icon="fas fa-sun" />
      <Button class="h-20 w-20 my-5" icon="fas fa-sun" round />

      <!-- Textfield -->
      <h1 class="text-2xl text-center bg-secondary py-1">Textfield</h1>
      <Textfield v-model="textValue" placeholder="Type here!" class="w-full h-15 my-5" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../components/uiBlocks/Dropdown.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';

export default defineComponent({
  name: 'SandBox',
  components: {
    Button,
    Dropdown,
    Textfield,
  },
  setup() {
    const dropdownItems = ref<ListItem[]>([
      //use date-now as id to be unique
      new ListItem(Date.now() + 1, 'Horst'),
      new ListItem(Date.now() + 2, 'Ilse'),
      new ListItem(Date.now() + 3, 'Anne'),
    ]);
    const dropdownValue = ref<ListItem>(dropdownItems.value[0]);
    const addDropdownItem = (value: string): void => {
      const listItem = new ListItem(Date.now(), value);
      dropdownItems.value.push(listItem);
    };
    const removeDropdownItem = (item: ListItem): void => {
      dropdownItems.value = dropdownItems.value.filter((_item) => _item.id !== item.id);
    };

    const textValue = ref<string>('');

    return {
      dropdownItems,
      dropdownValue,
      addDropdownItem,
      removeDropdownItem,
      textValue,
    };
  },
});
</script>
