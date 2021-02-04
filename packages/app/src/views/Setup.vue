<template>
  <div
    class="flex w-full bg-gradient-to-b from-primary to-secondary p-4 items-center content-center"
  >
    <Loading v-if="isTestingConnection" class="m-auto" />
    <form v-else class="flex flex-col form m-auto" @submit.prevent="saveBackend">
      <p class="font-heading font-light text-white text-center text-3xl mb-8">
        Verbinde dich mit deiner Leek Box
      </p>

      <LabeledInput label="Bitte trage die ID deiner Box ein">
        <Textfield v-model="boxId" placeholder="192.168.0.123" />
      </LabeledInput>

      <Button class="mt-8 p-2 ring-button ring-2" type="submit" text="Verbinden" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import Loading from '../components/uiBlocks/Loading.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import { loadBox } from '../compositions/useBackend';

export default defineComponent({
  name: 'Setup',

  components: {
    Button,
    Textfield,
    LabeledInput,
    Loading,
  },

  setup() {
    const boxId = ref('');
    const isTestingConnection = ref(false);

    const saveBackend = async (): Promise<void> => {
      isTestingConnection.value = true;

      // use localhost as default value
      await loadBox(boxId.value || 'localhost:3000');
    };

    // try to load directly if box id is already configured
    onBeforeMount(async () => {
      await loadBox();
    });

    return { saveBackend, boxId, isTestingConnection };
  },
});
</script>
