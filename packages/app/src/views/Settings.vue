<template>
  <div class="w-full flex flex-col">
    <header class="p-8 flex flex-row items-center">
      <Button back round icon="fas fa-times" class="h-7 w-7" />
      <span class="ml-2 text-3xl">Einstellungen</span>
    </header>
    <main class="bg-secondary max-h-full overflow-y-auto flex-grow p-6">
      <!-- Useranzeige -->
      <div class="flex flex-col justify-center items-center text-white">
        <span class="flex text-xl font-heading">
          <span class="my-auto fab fa-spotify" />
          <span class="ml-2">Nutzer:</span>
        </span>
        <span class="text-2xl font-semibold">{{ userEmail }}</span>
      </div>

      <!-- Lautsprecherauswahl -->
      <LabeledInput class="mb-5 h-20 mt-10" label="Lautsprecher">
        <Dropdown v-model="selectedSpeaker" :items="speakerList" :removeable="false" />
      </LabeledInput>
    </main>

    <footer class="flex text-gray-800 py-5">
      <span class="flex w-full text-xl">
        <Button round icon="fas fa-caret-left" class="ml-4 my-auto h-12 w-12" />
        <Button text="Speichern" center-text class="mx-2 px-3 py-2 text-2xl flex-grow" />
        <Button
          text="Abmelden"
          center-text
          class="mx-2 px-3 text-2xl flex-grow"
          @click="logoutUser()"
        />
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
import { isAuthenticated, logout, user } from '../compositions/useAuthentication';
import feathers from '../compositions/useBackend';

export default defineComponent({
  name: 'Settings',
  components: { Button, Dropdown, LabeledInput },
  setup() {
    const userEmail = ref<string>('');
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

    const loadUser = (): void => {
      if (isAuthenticated) {
        userEmail.value = user.value?.email || '';
      }
    };

    const logoutUser = (): void => {
      void logout();
    };

    onMounted(async () => {
      await loadSpeakers();
      loadUser();
    });

    return {
      selectedSpeaker,
      speakerList,
      userEmail,
      logoutUser,
    };
  },
});
</script>
