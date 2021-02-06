<template>
  <div class="add-tag w-full flex flex-col">
    <header class="p-8 flex flex-row items-start">
      <Button back icon="fas fa-times" size="md" />
      <div class="headlines ml-2 flex flex-col my-auto">
y        <span class="text-3xl">{{ steps[activeStep].title || 'Neuen Tag anlegen' }}</span>
        <span v-if="nfcTag && nfcTag.nfcData">Tag-ID: #{{ nfcTag.nfcData }}</span>
      </div>
    </header>

    <main
      class="bg-gradient-to-b from-primary to-secondary w-full flex flex-col flex-grow overflow-y-auto"
    >
      <component
        :is="steps[activeStep].component"
        v-model:nfc-tag="nfcTag"
        @update:is-valid="dataValid = $event"
        @proceed="nextStep"
      />
    </main>

    <footer class="flex flex-col items-center">
      <ul
        class="steps flex flex-row justify-center transform -translate-y-3 bg-white rounded-t-md px-2 py-1"
      >
        <li v-for="x in steps.length" :key="x" class="mx-2">
          {{ activeStep === x - 1 ? 'x' : 'o' }}
        </li>
      </ul>

      <div class="actions flex flex-row w-full justify-center mb-4 px-4">
        <Button
          v-if="activeStep !== 0"
          icon="fas fa-chevron-left"
          class="mr-4"
          @click="previousStep"
        />
        <Button
          v-if="activeStep === steps.length - 1"
          round
          class="flex-grow"
          icon="fas fa-download"
          text="Tag erstellen"
          :disabled="!dataValid"
          @click="saveTag"
        />
        <Button
          v-else-if="activeStep !== 0"
          class="flex-grow"
          icon="fas fa-chevron-right"
          icon-right
          text="Weiter"
          :disabled="!dataValid"
          @click="nextStep"
        />
        <span v-else class="text-center">Zum Fortfahren bitte NFC Tag an den Reader halten!</span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import TagStepImage from '../../components/tag/TagStepImage.vue';
import TagStepInfo from '../../components/tag/TagStepInfo.vue';
import TagStepPlaceTagOnReader from '../../components/tag/TagStepPlaceTagOnReader.vue';
import TagStepTrack from '../../components/tag/TagStepTrack.vue';
import Button from '../../components/uiBlocks/Button.vue';
import feathers from '../../compositions/useBackend';

export default defineComponent({
  name: 'AddTag',

  components: {
    Button,
  },

  setup() {
    const nfcTag = ref<NFCTag | null>(null);
    const steps = [
      { component: TagStepPlaceTagOnReader, title: 'Tag scannen' },
      { component: TagStepInfo, title: 'Tag anlegen' },
      { component: TagStepTrack, title: 'Musik auswählen' },
      { component: TagStepImage, title: 'Bild auswählen' },
    ];
    const activeStep = ref<number>(0);
    const dataValid = ref<boolean>(false);
    const router = useRouter();

    const saveTag = async (): Promise<void> => {
      if (!nfcTag.value) {
        return;
      }

      await feathers.service('nfc-tags').create(nfcTag.value);

      void router.push({ name: 'home' });
      alert('Neuen Tag erfolgreich erstellt.');
    };

    const previousStep = (): void => {
      dataValid.value = true;
      activeStep.value -= 1;
    };

    const nextStep = (): void => {
      dataValid.value = false;
      activeStep.value += 1;
    };

    return {
      activeStep,
      steps,
      nfcTag,
      saveTag,
      previousStep,
      nextStep,
      dataValid,
    };
  },
});
</script>
