<template>
  <div class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="p-8 flex flex-row items-center space-x-5">
      <Button back round icon="fas fa-times" class="h-10 w-10 flex-shrink-0" text="" />

      <div class="ml-2 flex flex-col">
        <span class="font-heading font-extralight text-2xl">Tag Editieren</span>
        <span v-if="currentNfcTag && currentNfcTag.nfcData" class="text-m opacity-40">
          Registrierte Tag-ID: #{{ currentNfcTag.nfcData }}
        </span>
      </div>
    </header>

    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-primary to-secondary flex items-start justify-center text-2xl text-gray-800"
    >
      <div v-if="currentNfcTag && currentNfcTag.nfcData" TODO>test {{ currentNfcTag }}</div>
      <span v-else class="p-4 text-white font-heading font-extralight">
        Dieser Nfc-Tag ist leider nicht verfügbar :(
      </span>
    </main>

    <footer class="flex-grow flex items-center justify-evenly text-2xl text-gray-800">
      <Button :text="'Abbrechen'" class="p-3 px-6" />
      <Button :text="'Speichern'" class="p-3 px-6" />
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from '../components/uiBlocks/Button.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'TagDetails',
  components: { Button },
  setup() {
    const currentNfcTag = ref<NFCTag>();
    const routeId = useRoute().params.id.toString();
    const router = useRouter();

    onMounted(async () => {
      try {
        currentNfcTag.value = await feathers.service('nfc-tags').get(routeId);
      } finally {
        if (!currentNfcTag.value || !currentNfcTag.value.nfcData) {
          void router.push('/tag-not-found');
        }
      }
    });

    return {
      currentNfcTag,
    };
  },
});
</script>
