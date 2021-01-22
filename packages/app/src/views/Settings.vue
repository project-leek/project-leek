<template>
  <div class="w-full flex flex-col">
    <header class="p-8 flex flex-row items-center">
      <Button back round icon="fas fa-times" class="h-7 w-7" />
      <span class="ml-2 text-3xl">Einstellungen</span>
    </header>
    <main class="bg-secondary max-h-full overflow-y-auto flex-grow p-6">
      <LabeledInput class="mb-5 h-20" label="Lautsprecher">
        <Dropdown v-model="selectedSpeaker" :items="speakerList" :removeable="false" />
      </LabeledInput>
    </main>

    <footer class="flex text-gray-800 py-5">
      <span class="flex w-full text-xl">
        <Button round icon="fas fa-caret-left" class="ml-4 my-auto h-8 w-8" />
        <Button text="Speichern" center-text class="mx-4 px-3 text-2xl flex-grow" />
      </span>
    </footer>
  </div>
</template>

<script lang="ts">
import { SpotifySpeaker } from '@leek/commons';
import { computed, defineComponent, onMounted, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../components/uiBlocks/Dropdown.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'Settings',
  components: { Button, Dropdown, LabeledInput },
  setup() {
    const selectedSpeaker = ref<SpotifySpeaker>();
    const speakers = ref<SpotifySpeaker[]>([]);
    const speakerList = computed(() => {
      return speakers.value.map((s) => {
        return new ListItem(s._id, s.name);
      });
    });

    onMounted(async () => {
      const allSpeakers = (await feathers.service('spotify-speakers').find()) as SpotifySpeaker[];
      if (allSpeakers) {
        speakers.value = allSpeakers;
      }
    });

    return {
      selectedSpeaker,
      speakerList,
    };
  },
});
</script>
