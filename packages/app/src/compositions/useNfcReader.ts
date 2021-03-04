import { Paginated } from '@feathersjs/feathers';
import { NFCReader } from '@leek/commons';
import { computed, ref } from 'vue';

import feathers from './useBackend';

let areReadersLoaded = false;

export const readers = ref<NFCReader[]>();

async function loadReaders(): Promise<void> {
  if (!readers.value) {
    const res = (await feathers.service('nfc-readers').find()) as Paginated<NFCReader>;
    readers.value = res.data;
  }

  if (areReadersLoaded) {
    return;
  }

  areReadersLoaded = true;

  feathers.service('nfc-readers').on('removed', (reader: NFCReader): void => {
    readers.value = (readers.value || []).filter((_reader) => _reader._id !== reader._id);
  });

  feathers.service('nfc-readers').on('created', (reader: NFCReader): void => {
    readers.value = [...(readers.value || []), reader];
  });

  feathers.service('nfc-readers').on('patched', (patchedReader: NFCReader): void => {
    readers.value = (readers.value || []).map((reader) => {
      if (reader._id === patchedReader._id) {
        return patchedReader;
      }

      return reader;
    });
  });
}

export const doesUserHaveOwnReaders = computed(() => {
  const ownedReaders = readers.value?.filter((reader) => reader.owner);
  return !!ownedReaders && ownedReaders.length > 0;
});

feathers.on('login', () => {
  void loadReaders();
});

feathers.on('logout', () => {
  readers.value = undefined;
});
