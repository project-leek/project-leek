<template>
  <div class="w-full bg-red-500 p-4">
    <div v-if="isTestingConnection" class="m-auto">
      <p>Laden, laden, laden, laden ...</p>
    </div>
    <form v-else class="flex flex-col form m-auto" @submit.prevent="saveBackend">
      <p v-if="isConnectionUrlInvalid" class="text-white">
        Kein Mensch findet deine Box. Ich leider auch nicht!
      </p>
      <LabeledInput label="Bitte gebe dein Box ID an">
        <Textfield v-model="backendUrl" placeholder="192.168.0.123:3030" />
      </LabeledInput>

      <Button class="mt-4" type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '../components/uiBlocks/Button.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import { loadBackend, saveBackendUrl } from '../compositions/useBackend';

export default defineComponent({
  name: 'Setup',

  components: {
    Button,
    Textfield,
    LabeledInput,
  },

  setup() {
    const router = useRouter();
    const backendUrl = ref('localhost:3030');
    const isTestingConnection = ref(false);
    const isConnectionUrlInvalid = ref(false);

    const saveBackend = async (): Promise<void> => {
      isTestingConnection.value = true;

      if (await saveBackendUrl(backendUrl.value)) {
        loadBackend();
        await router.push({ name: 'home' });
        return;
      }

      isConnectionUrlInvalid.value = true;
      isTestingConnection.value = false;
    };

    return { saveBackend, backendUrl, isTestingConnection, isConnectionUrlInvalid };
  },
});
</script>
