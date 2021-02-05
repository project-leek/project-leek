<template>
  <div class="mx-auto h-full w-full flex flex-col overflow-hidden">
    <header class="p-8 flex flex-row items-center space-x-5">
      <Button back icon="fas fa-times" size="xs" />

      <div class="ml-2 flex flex-col">
        <span class="font-heading font-extralight text-2xl">Tag Editieren</span>
        <span v-if="nfcTag" class="text-m opacity-40">Tag-ID: #{{ nfcTag.nfcData }}</span>
      </div>
    </header>

    <main
      v-if="nfcTag"
      class="overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary to-secondary flex flex-col items-start justify-start text-2xl text-gray-800 flex-grow"
    >
      <div v-if="routeName === 'tag-details'" class="tag-edit flex flex-col w-full p-4">
        <LabeledInput label="Name">
          <Textfield v-model="nfcTag.name" placeholder="z. B. Mario Figur" class="rounded-full" />
        </LabeledInput>

        <LabeledInput label="Gruppe">
          <Dropdown
            v-model="nfcTagGroup"
            v-model:items="tagGroupListItems"
            :removeable="false"
            placeholder-text="Wähle eine Gruppe"
            :enable-add-item="true"
          />
        </LabeledInput>

        <LabeledInput label="Musik">
          <div class="flex flex-row items-center">
            <span v-if="nfcTagTrack">{{ nfcTagTrack.title }}</span>
            <Button text="Musik ändern" class="px-3 ml-auto" :to="{ name: 'tag-edit-track' }" />
          </div>
        </LabeledInput>

        <LabeledInput label="Bild">
          <div class="flex flex-row items-center">
            <TagEntry class="w-32" :img="nfcTag.imageUrl" />
            <Button text="Bild ändern" class="px-3 ml-auto" :to="{ name: 'tag-edit-image' }" />
          </div>
        </LabeledInput>
      </div>
      <TagStepImage v-else-if="routeName === 'tag-edit-image'" v-model:nfc-tag="nfcTag" />
      <TagStepTrack v-else-if="routeName === 'tag-edit-track'" v-model:nfc-tag="nfcTag" />
    </main>

    <footer class="py-5 flex-grow-0 flex items-center justify-evenly text-2xl text-gray-800">
      <template v-if="routeName !== 'tag-details'">
        <Button icon="fas fa-caret-left" class="ml-4" back />
        <Button text="Auswählen" class="mx-4 flex-grow" back />
      </template>
      <Button
        v-else
        text="Speichern"
        class="mx-4 flex-grow"
        :enabled="isNfcTagValid"
        @click="saveNfcTag"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag, Track } from '@leek/commons';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import TagStepImage from '../../components/tag/TagStepImage.vue';
import TagStepTrack from '../../components/tag/TagStepTrack.vue';
import Button from '../../components/uiBlocks/Button.vue';
import ListItem from '../../components/uiBlocks/Dropdown.ListItem';
import Dropdown from '../../components/uiBlocks/Dropdown.vue';
import LabeledInput from '../../components/uiBlocks/LabeledInput.vue';
import TagEntry from '../../components/uiBlocks/TagEntry.vue';
import Textfield from '../../components/uiBlocks/Textfield.vue';
import feathers from '../../compositions/useBackend';
import { getIsNfcTagValid, loadTagGroups, tagGroupListItems } from '../../compositions/useNfcTag';
import { getTrackOfTag } from '../../compositions/useTrack';

export default defineComponent({
  name: 'TagDetails',

  components: { Textfield, Dropdown, LabeledInput, Button, TagStepImage, TagStepTrack, TagEntry },

  props: {
    tagId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const routeName = computed(() => route.name);

    const nfcTag = ref<NFCTag>();
    const nfcTagTrack = ref<Track>();
    const isNfcTagValid = getIsNfcTagValid(nfcTag);
    const nfcTagGroup = computed({
      get: () => nfcTag.value && new ListItem(nfcTag.value.group),
      set: (group?: ListItem) => {
        if (!nfcTag.value) {
          return;
        }

        nfcTag.value.group = group?.value || '';
      },
    });

    const saveNfcTag = async (): Promise<void> => {
      if (!nfcTag.value) {
        return;
      }

      await feathers.service('nfc-tags').update(nfcTag.value._id, nfcTag.value);

      alert('Tag erfolgreich gespeichert.');

      await router.push({ name: 'home' });
    };

    const loadTrack = async (): Promise<void> => {
      // load track of tag if not already or if it changed
      if (nfcTag.value && nfcTagTrack.value?.uri !== nfcTag.value.trackUri) {
        try {
          nfcTagTrack.value = await getTrackOfTag(nfcTag.value);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('ERROR:', error);
        }
      }
    };

    onMounted(async () => {
      // load tag from id
      try {
        nfcTag.value = await feathers.service('nfc-tags').get(props.tagId);
      } catch (e) {
        void router.push({ name: 'tag-not-found' }); // TODO page does not exist
      }

      await loadTrack();

      await loadTagGroups();
    });

    // update track if we return from 'tag-edit-track' route
    watch(() => route.name, loadTrack);

    return {
      nfcTag,
      nfcTagTrack,
      nfcTagGroup,
      isNfcTagValid,
      saveNfcTag,
      routeName,
      tagGroupListItems,
    };
  },
});
</script>
