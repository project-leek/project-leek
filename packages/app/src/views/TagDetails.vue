<template>
  <div class="mx-auto h-full w-full flex flex-col overflow-hidden">
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
      class="overflow-x-hidden overflow-y-auto bg-gradient-to-b from-primary to-secondary flex items-start justify-center text-2xl text-gray-800 flex-grow"
    >
      <component
        :is="activeDetailsPage"
        v-if="currentNfcTag && currentNfcTag.nfcData"
        :nfc-tag="unsavedNFCTag"
        @open-image-details="openImageDetails"
        @open-track-details="openTrackDetails"
      />
    </main>

    <footer class="py-5 flex-grow-0 flex items-center justify-evenly text-2xl text-gray-800">
      <Button
        v-if="showBackButton"
        icon="fas fa-caret-left"
        class="w-14 h-14 mx-4"
        round
        @click="goBack"
      />
      <Button :text="'Speichern'" class="p-3 mx-4 flex-1" @click="saveChanges" />
    </footer>
  </div>
</template>

<script lang="ts">
import { NFCTag } from '@leek/commons';
import { Component, defineComponent, onMounted, ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';

import AddTagStepImage from '../components/add-tag/AddTagStepImage.vue';
import AddTagStepTrack from '../components/add-tag/AddTagStepTrack.vue';
import EditTag from '../components/edit-tag/EditTag.vue';
import Button from '../components/uiBlocks/Button.vue';
import feathers from '../lib/feathers';

export default defineComponent({
  name: 'TagDetails',
  components: { Button },
  props: {
    tagId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const currentNfcTag = ref<NFCTag>();
    const unsavedNFCTag = ref<NFCTag>();
    const router = useRouter();
    const activeDetailsPage = shallowRef<Component>(EditTag);
    const showBackButton = ref<boolean>(false);

    onMounted(async () => {
      try {
        currentNfcTag.value = await feathers.service('nfc-tags').get(props.tagId);
        console.log('Error after');
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
        console.log('GO Back');
        if (currentNfcTag.value && currentNfcTag.value.nfcData) {
          void feathers.service('nfc-tags').update(props.tagId, currentNfcTag.value);
        }
        router.go(-1);
      } else {
        activeDetailsPage.value = EditTag;
      }
      showBackButton.value = false;
    }

    function openImageDetails(): void {
      activeDetailsPage.value = AddTagStepImage;
      showBackButton.value = true;
    }

    function openTrackDetails(): void {
      activeDetailsPage.value = AddTagStepTrack;
      showBackButton.value = true;
    }

    return {
      currentNfcTag,
      openImageDetails,
      openTrackDetails,
      unsavedNFCTag,
      activeDetailsPage,
      saveChanges,
      goBack,
      showBackButton,
    };
  },
});
</script>
