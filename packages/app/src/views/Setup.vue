<template>
  <div
    class="flex w-full bg-gradient-to-b from-primary to-secondary p-4 items-center content-center"
  >
    <Loading v-if="isTestingConnection" class="m-auto" />
    <form v-else class="flex flex-col form m-auto" @submit.prevent="saveBackend">
      <p class="font-heading font-light text-white text-center text-3xl mb-8">
        Verbinde dich mit deiner Leek Box
      </p>

      <div v-if="isConnectionUrlInvalid" class="flex flex-col mb-6 items-center">
        <img src="/src/assets/not-found-homer.gif" />
        <p class="text-center text-2xl text-white">
          Hmm. Ich glaube deine Box ist in der Matrix verloren gegangen!
        </p>
      </div>

      <LabeledInput label="Bitte trage die Adresse deiner Box ein">
        <Textfield v-model="backendUrl" placeholder="leek123.example.org" />
      </LabeledInput>

      <Button class="mt-8 p-2 ring-button ring-2" type="submit" text="Verbinden" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import Loading from '../components/uiBlocks/Loading.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import { resolveBackendUrl, setBackendUrl } from '../compositions/useBackend';

export default defineComponent({
  name: 'Setup',
  components: {
    Button,
    Textfield,
    LabeledInput,
    Loading,
  },
  setup() {
    const backendUrl = ref('');
    const isTestingConnection = ref(false);
    const isConnectionUrlInvalid = ref(false);

    const saveBackend = async (): Promise<void> => {
      isTestingConnection.value = true;

      const url = await resolveBackendUrl(backendUrl.value);

      // could not resolve backend
      if (!url) {
        isTestingConnection.value = false;
        isConnectionUrlInvalid.value = true;
        return;
      }

      setBackendUrl(url);

      // simply reload app ,-)
      location.reload();
    };

    return {
      saveBackend,
      backendUrl,
      isTestingConnection,
      isConnectionUrlInvalid,
    };
  },
});
</script>
