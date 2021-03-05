<template>
  <div class="add-tag-step-place-tag-on-reader p-6 flex h-full w-full my-auto">
    <img class="object-contain" src="/src/assets/attach-tag.gif" />
  </div>
</template>

<script lang="ts">
import { NFCReader, NFCTag } from '@leek/commons';
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';

import feathers from '../../compositions/useBackend';
import { getTagByNfcData } from '../../compositions/useNfcTag';

export default defineComponent({
  name: 'TagStepPlaceOnReader',

  props: {
    // eslint-disable-next-line vue/no-unused-properties
    nfcTag: {
      type: Object as PropType<NFCTag>,
      default: null,
    },
  },

  emits: {
    proceed: (): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:nfc-tag': (_payload: NFCTag): boolean => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:is-valid': (_payload: boolean): boolean => true,
  },

  setup(_, ctx) {
    const nfcTag = ref<NFCTag>(new NFCTag());
    const router = useRouter();

    const attachedTagListener = (nfcReader: NFCReader): void => {
      void (async (): Promise<void> => {
        // TODO only listen to selected nfc-reader
        if (!nfcReader.attachedTagData) {
          return;
        }

        const searchedNfcTag = await getTagByNfcData(nfcReader.attachedTagData);

        // tag already exists
        if (searchedNfcTag) {
          await router.replace({ name: 'tag-details', params: { tagId: searchedNfcTag._id } });
          return;
        }

        nfcTag.value.nfcData = nfcReader.attachedTagData;
        ctx.emit('update:nfc-tag', nfcTag.value);
        ctx.emit('proceed');
      })();
    };

    onMounted(() => {
      ctx.emit('update:nfc-tag', nfcTag.value);

      feathers
        .service('nfc-readers')
        .on('patched', attachedTagListener)
        .on('updated', attachedTagListener);
    });

    onBeforeUnmount(() => {
      feathers
        .service('nfc-readers')
        .off('patched', attachedTagListener)
        .off('updated', attachedTagListener);
    });
  },
});
</script>
