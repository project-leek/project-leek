<template>
  <div class="add-tag w-full flex flex-col">
    <header class="p-8 flex flex-row">
      <Button back round icon="fas fa-times" class="h-10 w-10" :icon-size="6" />
      <div class="headlines ml-2 flex flex-col my-auto">
        <span class="text-3xl">Neuen Tag anlegen</span>
        <span v-if="nfcTag && nfcTag.nfcData">Tag-ID: #{{ nfcTag.nfcData }}</span>
      </div>
    </header>

    <main
      class="bg-gradient-to-b from-primary to-secondary w-full flex flex-col flex-grow overflow-y-auto"
    >
      <component
        :is="steps[activeStep]"
        :nfc-tag="nfcTag"
        @update:nfc-tag="updateTag"
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
          round
          :text-size="5"
          icon="fas fa-chevron-left"
          class="mr-4 px-4 py-2 text-center"
          @click="previousStep"
        />
        <Button
          v-if="activeStep === steps.length - 1"
          round
          class="flex-grow p-2"
          icon="fas fa-download"
          text="Tag erstellen"
          :enabled="showContinue"
          @click="saveTag"
        />
        <Button
          v-else-if="activeStep !== 0"
          class="flex-grow p-2"
          icon="fas fa-chevron-right"
          round
          text="Weiter"
          :enabled="showContinue"
          @click="nextStep"
        />
        <span v-else class="text-center">Zum Fortfahren bitte NFC Tag an den Reader halten!</span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag, TagResult } from '@leek/commons';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import AddTagStepImage from '../components/add-tag/AddTagStepImage.vue';
import AddTagStepInfo from '../components/add-tag/AddTagStepInfo.vue';
import AddTagStepPlaceTagOnReader from '../components/add-tag/AddTagStepPlaceTagOnReader.vue';
import AddTagStepTrack from '../components/add-tag/AddTagStepTrack.vue';
import Button from '../components/uiBlocks/Button.vue';
import feathers from '../compositions/useBackend';

export default defineComponent({
  name: 'AddTag',

  components: {
    Button,
  },

  setup() {
    const nfcTag = ref<NFCTag | null>(null);
    const steps = [AddTagStepPlaceTagOnReader, AddTagStepInfo, AddTagStepTrack, AddTagStepImage];
    const activeStep = ref<number>(0);
    const dataValid = ref<boolean>(false);
    const router = useRouter();

    const updateTag = (result: TagResult): void => {
      if (result.valid) {
        console.log('GÜLTIG!');
      } else {
        console.log('DAS PASST NICHT!');
      }

      nfcTag.value = result.tag;
      dataValid.value = result.valid;
      // console.log('Called from step ', activeStep.value);
      // console.log('Result: ', result);
    };

    const saveTag = async (): Promise<void> => {
      if (!nfcTag.value) {
        return;
      }

      await feathers.service('nfc-tags').create(nfcTag.value);

      void router.push({ name: 'home' });
      alert('Neuen Tag erfolgreich erstellt.');
    };

    const previousStep = (): void => {
      activeStep.value -= 1;
    };

    const nextStep = (): void => {
      dataValid.value = false;
      activeStep.value += 1;
    };

    const showContinue = computed(() => dataValid.value);

    return {
      activeStep,
      steps,
      nfcTag,
      updateTag,
      saveTag,
      previousStep,
      nextStep,
      showContinue,
    };
  },
});
</script>
