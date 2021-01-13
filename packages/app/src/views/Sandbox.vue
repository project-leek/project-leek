<template>
  <div class="w-full h-full bg-red-500">
    <h1 class="text-3xl text-center bg-primary py-2">Sandbox</h1>
    <div class="p-2">
      <!-- Dropdown -->
      <h1 class="text-2xl text-center bg-secondary py-1">Dropdown</h1>
      <Dropdown
        v-model="dropDownValue"
        class="mb-5 h-20"
        service="nfc-tags"
        value-property="nfcId"
        label="NFC-Tag"
        add-item-option
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
    const dropDownValue = ref<ListItem>(new ListItem());
    const textValue = ref<string>('');

    return {
      dropDownValue,
      textValue,
    };
  },
});
</script>
