<template>
  <div id="wrapper" class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="h-1/5 bg-white flex items-center justify-center text-4xl text-gray-800">
      <input
        v-model="tagName"
        class="focus: outline-none bg-transparent placeholder-opacity-50 text-2xl"
        :placeholder="'tag name'"
        type="text"
        @input="changeTagName()"
      />
    </header>
    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-primary to-secondary flex items-center justify-center text-4xl text-gray-800"
    ></main>
    <footer class="flex-grow flex items-center justify-center text-4xl text-gray-800">
      <Button :text="'Speichern'" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { NFCTag } from '@leek/commons';
import feathers from '../lib/feathers';
import Button from '../components/uiBlocks/Button.vue';

export default defineComponent({
  name: 'TagDetails',
  components: { Button },
  setup() {
    const tag = ref<NFCTag>();
    const tagName = ref<string>(tag.value?.name);

    onMounted(async () => {
      tag.value = await feathers.service('nfc-tags').get('qgW0V3uCuwJDNYx8');
      tagName.value = tag.value?.name;
    });

    function changeTagName() {
      //tag.value.name = tagName.value;
      feathers.service('nfc-tags').update(tag.value?._id, tag.value);
    }

    feathers.service('nfc-tags').on('update', updatedTag => {
      if(updatedTag._id == )
    })

    return {
      tag,
      tagName,
      changeTagName,
    };
  },
});
</script>
