<template>
  <div class="add-tag-step-place-tag-on-reader p-6 flex h-full w-full my-auto">
    <img class="object-contain" src="/src/assets/attach-tag.gif" />
  </div>
</template>

<script lang="ts">
import { Paginated } from '@feathersjs/feathers';
import { NFCReader, NFCTag, TagResult } from '@leek/commons';
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';

import feathers from '../../compositions/useBackend';

export default defineComponent({
  name: 'AddTagStepPlaceOnReader',

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
    'update:nfc-tag': (_payload: TagResult): boolean => true,
  },

  setup(_, ctx) {
    const nfcTag = ref<NFCTag>();

    const router = useRouter();

    const attachedTagListener = (nfcReader: NFCReader): void => {
      void (async (): Promise<void> => {
        // TODO only listen to selected nfc-reader
        if (!nfcReader.attachedTagData) {
          return;
        }

        const nfcTagResult = (await feathers
          .service('nfc-tags')
          .find({ query: { nfcData: nfcReader.attachedTagData } })) as Paginated<NFCTag>;

        if (nfcTagResult.total > 0) {
          alert('Der Tag wurde bereits angelegt!');
          void router.push({ name: 'home' }); // TODO redirect to edit
          // throw new Error('Tag is already assigned');
        }

        // this should not happen
        if (!nfcTag.value) {
          return;
        }

        nfcTag.value.nfcData = nfcReader.attachedTagData;
        const res = {
          tag: nfcTag.value,
          valid: true,
        };
        ctx.emit('update:nfc-tag', res);
        ctx.emit('proceed');
      })();
    };

    onMounted(() => {
      nfcTag.value = new NFCTag();
      const res = {
        tag: nfcTag.value,
        valid: false,
      } as TagResult;
      ctx.emit('update:nfc-tag', res);

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
