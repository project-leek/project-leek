<template>
  <div class="add-tag w-full flex flex-col">
    <header class="px-8 h-24 flex flex-row items-center">
      <Button
        back
        round
        icon="fas fa-times"
        class="h-12 w-12 bg-gradient-to-b from-primary to-secondary"
        :icon-size="6"
      />
      <div class="headlines ml-5 flex flex-col my-auto">
        <span class="text-3xl font-medium"> Neuen Tag registrieren </span>
        <span v-if="nfcTag && nfcTag.nfcData" class="italic font-thin text-black text-opacity-30"
          >Tag-ID #{{ nfcTag.nfcData }} -
          <span>{{ steps[activeStep].title }}</span>
        </span>
      </div>
    </header>

    <main
      class="bg-gradient-to-b from-primary to-secondary w-full flex flex-col flex-grow overflow-y-auto"
    >
      <component
        :is="steps[activeStep].component"
        :nfc-tag="nfcTag"
        @update:nfc-tag="updateTag"
        @proceed="activeStep++"
      />
    </main>

    <footer class="h-24 flex flex-col items-center">
      <ul
        class="steps flex flex-row justify-center transform -translate-y-3 bg-white rounded-t-md px-2 py-1"
      >
        <li v-for="x in steps.length" :key="x" class="mx-2">
          {{ activeStep === x - 1 ? 'x' : 'o' }}
        </li>
      </ul>

      <div class="actions flex flex-row w-full items-center justify-center px-4">
        <Button
          v-if="activeStep !== 0"
          round
          :text-size="5"
          icon="fas fa-chevron-left"
          class="mr-4 h-12 w-12 text-2xl text-center bg-gradient-to-b from-primary to-secondary"
          @click="previousStep"
        />
        <Button
          v-if="activeStep === steps.length - 1"
          round
          class="flex-grow h-12 p-2 bg-gradient-to-b from-primary to-secondary"
          icon="fas fa-download"
          text="Tag erstellen"
          @click="saveTag"
        />
        <Button
          v-else-if="activeStep !== 0"
          round
          text="Weiter"
          both-center
          class="flex-grow h-12 p-2 text-2xl bg-gradient-to-b from-primary to-secondary"
          icon="fas fa-chevron-right"
          @click="nextStep"
        />
        <span v-else class="text-center text-xl"
          >Zum Fortfahren bitte NFC Tag an den Reader halten!</span
        >
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { defineComponent, ref } from 'vue';
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
    const steps = [
      { component: AddTagStepPlaceTagOnReader, title: 'Tag Scannen' },
      { component: AddTagStepInfo, title: 'Details' },
      { component: AddTagStepTrack, title: 'Musik Auswahl' },
      { component: AddTagStepImage, title: 'Bild Auswahl' },
    ];
    const activeStep = ref<number>(0);
    const router = useRouter();

    const updateTag = (_nfcTag: NFCTag): void => {
      nfcTag.value = _nfcTag;
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
      activeStep.value += 1;
    };

    return {
      activeStep,
      steps,
      nfcTag,
      updateTag,
      saveTag,
      previousStep,
      nextStep,
    };
  },
});
</script>
