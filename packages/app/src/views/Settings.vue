<template>
  <div class="w-full flex flex-col">
    <header class="p-8 flex flex-row items-center">
      <Button back icon="fas fa-times" size="md" />
      <span class="ml-2 text-3xl">Einstellungen</span>
    </header>
    <main
      class="bg-secondary max-h-full overflow-y-auto flex-grow p-6 bg-gradient-to-b from-primary to-secondary"
    >
      <!-- User -->
      <div v-if="user" class="flex flex-col justify-center items-center text-white">
        <span class="flex text-xl font-heading">
          <span class="my-auto fab fa-spotify" />
          <span class="ml-2">Nutzer:</span>
        </span>
        <span class="text-2xl font-semibold">{{ user.email }}</span>
      </div>

      <!-- Speaker -->
      <LabeledInput class="mb-5 h-20 mt-10" label="Lautsprecher">
        <Dropdown v-model="selectedSpeaker" :items="speakerList" :removeable="false" />
      </LabeledInput>
    </main>

    <footer class="flex text-gray-800 py-5">
      <span class="flex w-full">
        <Button text="Speichern" class="ml-4 flex-grow" />
        <Button text="Abmelden" class="mx-4 flex-grow" @click="logout" />
      </span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Speaker } from '@leek/commons';
import { computed, defineComponent, onMounted, ref } from 'vue';

import Button from '../components/uiBlocks/Button.vue';
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../components/uiBlocks/Dropdown.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import { logout, user } from '../compositions/useAuthentication';
import feathers from '../compositions/useBackend';

export default defineComponent({
  name: 'Settings',
  components: { Button, Dropdown, LabeledInput },
  setup() {
    const selectedSpeaker = ref<Speaker>();
    const speakers = ref<Speaker[]>([]);

    const speakerList = computed(() => {
      return speakers.value.map((s) => {
        return new ListItem(s._id, s.name);
      });
    });

    const loadSpeakers = async (): Promise<void> => {
      const allSpeakers = (await feathers.service('spotify-speakers').find()) as Speaker[];
      if (allSpeakers) {
        speakers.value = allSpeakers;
      }
    };

    onMounted(async () => {
      await loadSpeakers();
    });

    return {
      selectedSpeaker,
      speakerList,
      user,
      logout,
    };
  },
});
</script>
