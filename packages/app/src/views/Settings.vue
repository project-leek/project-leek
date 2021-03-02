<template>
  <div class="w-full flex flex-col">
    <header class="p-4 flex flex-row items-center">
      <Button v-if="doesUserHaveOwnReaders" :to="{ name: 'home' }" icon="fas fa-times" size="md" />
      <span class="ml-2 text-3xl">Einstellungen</span>
    </header>
    <main
      class="flex flex-col bg-secondary max-h-full overflow-y-auto flex-grow p-6 bg-gradient-to-b from-primary to-secondary"
    >
      <!-- User -->
      <div v-if="user" class="flex flex-col justify-center items-center text-white">
        <span class="flex text-xl font-heading">
          <span class="my-auto fab fa-spotify" />
          <span class="ml-2">Nutzer:</span>
        </span>
        <span class="text-2xl font-semibold">{{ user.email }}</span>
      </div>

      <!-- Reader -->
      <LabeledInput class="mb-5 mt-10" label="Leek Boxen">
        <div class="flex flex-row flex-wrap content-between">
          <span v-if="!readers || readers.length === 0" class="text-white mx-auto mt-8 text-xl"
            >Bitte verbinde eine Box mit deinem System.</span
          >
          <div v-else>
            <div
              v-for="reader in readers"
              :key="reader._id"
              class="relative flex flex-col mr-4 mb-4 w-32 cursor-pointer border border-white shadow-2xl rounded-xl p-4 pb-0 text-center"
              @click="selectReader(reader)"
            >
              <img
                v-if="!reader.owner"
                class="absolute top-0 right-0 w-12"
                src="/src/assets/new.png"
              />
              <img class="w-24" src="/src/assets/music-box.svg" />
              <span class="mt-2 text-white">{{ reader.name || 'Leek Box' }}</span>
            </div>
          </div>

          <p v-if="!doesUserHaveOwnReaders" class="text-center text-white text-2xl">
            Bitte richte zuerst mindestens eine Box ein, um die App verwenden zu können.
          </p>
        </div>
      </LabeledInput>

      <div class="text-white mt-auto">
        <span>Acknowledgement:</span>
        Favicon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </main>

    <footer class="flex text-gray-800 py-5">
      <Button text="Abmelden" class="mx-4 flex-grow" @click="doLogout" />
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCReader } from '@leek/commons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import Button from '../components/uiBlocks/Button.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import { logout, user } from '../compositions/useAuthentication';
import feathers from '../compositions/useBackend';
import { doesUserHaveOwnReaders, readers } from '../compositions/useNfcReader';

export default defineComponent({
  name: 'Settings',

  components: { Button, LabeledInput },

  setup() {
    const router = useRouter();

    const selectReader = async (reader: NFCReader): Promise<void> => {
      // claim reader
      if (!reader.owner) {
        if (!user.value) {
          throw new Error("Can't find user.");
        }

        await feathers.service('nfc-readers').patch(reader._id, { owner: user.value._id });
      }

      await router.push({ name: 'reader', params: { readerId: reader._id } });
    };

    const doLogout = async (): Promise<void> => {
      await logout();
      await router.replace({ name: 'welcome' });
    };

    return {
      readers,
      user,
      doLogout,
      selectReader,
      doesUserHaveOwnReaders,
    };
  },
});
</script>
