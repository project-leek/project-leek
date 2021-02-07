<template>
  <div v-if="reader" class="w-full flex flex-col">
    <header class="p-8 flex flex-row items-center">
      <Button :to="{ name: 'settings' }" icon="fas fa-times" size="md" />
      <span class="ml-2 text-3xl">Box: {{ readerName }}</span>
    </header>
    <main
      class="bg-secondary max-h-full overflow-y-auto flex-grow p-6 bg-gradient-to-b from-primary to-secondary"
    >
      <LabeledInput label="Tag Name" class="w-full">
        <Textfield v-model="readerName" placeholder="z. B. Mario Figur" class="rounded-full" />
      </LabeledInput>

      <LabeledInput class="mb-5 mt-10" label="Box Lautsprecher">
        <Dropdown v-model="readerSpeaker" :items="speakerListItems" :removeable="false" />
      </LabeledInput>
    </main>

    <footer class="flex text-gray-800 py-5">
      <Button text="Speichern" class="mx-4 flex-grow" @click="saveReader" />
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '../components/uiBlocks/Button.vue';
import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../components/uiBlocks/Dropdown.vue';
import LabeledInput from '../components/uiBlocks/LabeledInput.vue';
import Textfield from '../components/uiBlocks/Textfield.vue';
import feathers from '../compositions/useBackend';
import { readers } from '../compositions/useNfcReader';
import { loadSpeakers, speakers } from '../compositions/useSpeaker';

export default defineComponent({
  name: 'ReaderDetails',

  components: { Button, Dropdown, LabeledInput, Textfield },

  props: {
    readerId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const reader = computed(() =>
      (readers.value || []).find((reader) => reader._id === props.readerId)
    );
    const readerName = ref(reader.value?.name || '');
    const speakerListItems = computed(() =>
      (speakers.value || []).map((speaker) => new ListItem(speaker._id, speaker.name))
    );
    const readerSpeaker = ref(
      speakerListItems.value.find((speaker) => speaker.id === reader.value?.selectedSpeaker)
    );

    const saveReader = async (): Promise<void> => {
      if (!reader.value) {
        return;
      }

      await feathers.service('nfc-readers').patch(reader.value._id, {
        name: readerName.value,
        selectedSpeaker: readerSpeaker.value ? (readerSpeaker.value.id as string) : undefined,
      });

      await router.push({ name: 'settings' });
    };

    onMounted(async () => {
      await loadSpeakers();
    });

    return {
      reader,
      readerName,
      readerSpeaker,
      speakerListItems,
      saveReader,
    };
  },
});
</script>
