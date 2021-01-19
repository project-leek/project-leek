<template>
  <div class="mx-auto max-w-lg h-full w-full flex flex-col overflow-hidden">
    <header class="p-8 flex flex-row items-center space-x-5">
      <Button back round icon="fas fa-times" class="h-10 w-10 flex-shrink-0" text="" />

      <div class="ml-2 flex flex-col">
        <span class="font-heading font-extralight text-2xl">Tag Editieren</span>
        <span v-if="currentNfcTag && currentNfcTag.nfcData" class="text-m opacity-40">
          Registrierte Tag-ID: #{{ currentNfcTag.nfcData }}
        </span>
      </div>
    </header>

    <main
      class="h-2/3 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-primary to-secondary flex items-start justify-center text-2xl text-gray-800"
    >
      <component
        :is="activeDetailsPage"
        v-if="currentNfcTag && currentNfcTag.nfcData"
        :nfc-tag="unsavedNFCTag"
        @open-image-details="openImageDetails()"
        @open-track-details="openTrackDetails()"
      />
    </main>

    <footer class="flex-grow flex items-center justify-evenly text-2xl text-gray-800">
      <Button :text="'Abbrechen'" class="p-3 px-6" @click="goBack()" />
      <Button :text="'Speichern'" class="p-3 px-6" @click="saveChanges()" />
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { Component, defineComponent, onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AddTagStepImage from '../components/add-tag/AddTagStepImage.vue';
import AddTagStepTrack from '../components/add-tag/AddTagStepTrack.vue';
import EditTag from '../components/edit-tag/EditTag.vue';
import Button from '../components/uiBlocks/Button.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'TagDetails',
  components: { Button },
  setup() {
    const currentNfcTag = ref<NFCTag>();
    const unsavedNFCTag = ref<NFCTag>();
    const routeId = useRoute().params.id.toString();
    const router = useRouter();
    const activeDetailsPage = shallowRef<Component>(EditTag);

    onMounted(async () => {
      try {
        currentNfcTag.value = await feathers.service('nfc-tags').get(routeId);
      } finally {
        if (!currentNfcTag.value || !currentNfcTag.value.nfcData) {
          void router.push('/tag-not-found');
        } else {
          unsavedNFCTag.value = currentNfcTag.value;
        }
      }
    });

    function saveChanges(): void {
      currentNfcTag.value = unsavedNFCTag.value;
      goBack();
    }

    function goBack(): void {
      if (activeDetailsPage.value === EditTag) {
        if (currentNfcTag.value && currentNfcTag.value.nfcData) {
          void feathers.service('nfc-tags').update(routeId, currentNfcTag.value);
        }
        router.go(-1);
      } else {
        activeDetailsPage.value = EditTag;
      }
    }

    function openImageDetails(): void {
      activeDetailsPage.value = AddTagStepImage;
    }

    function openTrackDetails(): void {
      activeDetailsPage.value = AddTagStepTrack;
    }

    return {
      currentNfcTag,
      openImageDetails,
      openTrackDetails,
      unsavedNFCTag,
      activeDetailsPage,
      saveChanges,
      goBack,
    };
  },
});
</script>
