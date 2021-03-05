<template>
  <div class="mx-auto h-full w-full flex flex-col overflow-hidden">
    <header class="p-4 flex flex-row items-center space-x-5">
      <Button back icon="fas fa-times" size="md" />

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

        <LabeledInput label="Gruppe" class="mt-8">
          <Dropdown
            v-model="nfcTagGroup"
            v-model:items="tagGroupListItems"
            :removeable="false"
            placeholder-text="Wähle eine Gruppe"
            :enable-add-item="true"
          />
        </LabeledInput>

        <LabeledInput label="Musik" class="mt-8">
          <div class="flex flex-row items-center">
            <div class="flex relative bg-gray-100 rounded-2xl p-4 w-44 h-44 overflow-hidden">
              <img
                class="absolute w-80/100 top-10/100 left-10/100 opacity-5"
                src="/src/assets/spotify.png"
              />
              <span v-if="nfcTagTrack" class="w-full text-center my-auto overflow-hidden">{{
                cut(nfcTagTrack.title, 42)
              }}</span>
            </div>
            <Button
              icon="far fa-edit"
              text="Musik ändern"
              class="hidden md:flex ml-auto"
              size="lg"
              :to="{ name: 'tag-edit-track' }"
            />
            <Button
              icon="far fa-edit"
              class="md:hidden ml-auto"
              size="lg"
              :to="{ name: 'tag-edit-track' }"
            />
          </div>
        </LabeledInput>

        <LabeledInput label="Bild" class="mt-8">
          <div class="flex flex-row items-center">
            <TagEntry
              v-if="nfcTag.imageUrl === 'spotify' && nfcTagTrack"
              class="w-44"
              :img="nfcTagTrack.imageUri"
            />
            <TagEntry v-else class="w-44" :img="nfcTag.imageUrl" />
            <Button
              icon="far fa-edit"
              class="md:hidden ml-auto"
              size="lg"
              :to="{ name: 'tag-edit-image' }"
            />
            <Button
              icon="far fa-edit"
              text="Bild ändern"
              class="hidden md:flex ml-auto"
              size="lg"
              :to="{ name: 'tag-edit-image' }"
            />
          </div>
        </LabeledInput>
      </div>
      <TagStepImage v-else-if="routeName === 'tag-edit-image'" v-model:nfc-tag="nfcTag" />
      <TagStepTrack v-else-if="routeName === 'tag-edit-track'" v-model:nfc-tag="nfcTag" />
    </main>

    <footer class="py-5 flex-grow-0 flex items-center justify-evenly text-2xl text-gray-800">
      <Button v-if="routeName !== 'tag-details'" text="Auswählen" class="mx-4 flex-grow" back />
      <Button
        v-else
        text="Speichern"
        class="mx-4 flex-grow"
        :disabled="!isNfcTagValid"
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

      await feathers.service('nfc-tags').patch(nfcTag.value._id, nfcTag.value);

      alert('Tag erfolgreich gespeichert.');

      await router.push({ name: 'home' });
    };

    onMounted(async () => {
      // load tag from id
      try {
        nfcTag.value = await feathers.service('nfc-tags').get(props.tagId);
      } catch (e) {
        void router.push({ name: 'tag-not-found' }); // TODO page does not exist
      }

      await loadTagGroups();
    });

    watch(
      () => nfcTag.value?.trackUri,
      async (_trackUri) => {
        // do not load anything if we have no tag
        if (!nfcTag.value) {
          return;
        }

        // load if no track is loaded or the url changed
        if (!nfcTagTrack.value || _trackUri !== nfcTagTrack.value.uri) {
          nfcTagTrack.value = await getTrackOfTag(nfcTag.value);
        }

        if (nfcTag.value.imageUrl) {
          //
        }
      }
    );

    const cut = (str: string, length: number): string =>
      str.length < length ? str : `${str.substr(0, length)} ...`;

    return {
      nfcTag,
      nfcTagTrack,
      nfcTagGroup,
      isNfcTagValid,
      saveNfcTag,
      routeName,
      tagGroupListItems,
      cut,
    };
  },
});
</script>
