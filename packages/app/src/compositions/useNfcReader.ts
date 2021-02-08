import { Paginated } from '@feathersjs/feathers';
import { NFCReader } from '@leek/commons';
import { ref } from 'vue';

import { user } from './useAuthentication';
import feathers from './useBackend';

const readerService = feathers.service('nfc-readers');
let areReadersLoaded = false;

export const readers = ref<NFCReader[]>();

async function loadReaders(): Promise<void> {
  if (!readers.value) {
    const res = (await readerService.find()) as Paginated<NFCReader>;
    readers.value = res.data;
  }

  if (areReadersLoaded) {
    return;
  }

  areReadersLoaded = true;

  readerService.on('removed', (reader: NFCReader): void => {
    readers.value = (readers.value || []).filter((_reader) => _reader._id !== reader._id);
  });

  readerService.on('created', (reader: NFCReader): void => {
    readers.value = [...(readers.value || []), reader];
  });

  readerService.on('patched', (patchedReader: NFCReader): void => {
    readers.value = (readers.value || []).map((reader) => {
      if (reader._id === patchedReader._id) {
        return patchedReader;
      }

      return reader;
    });
  });
}

export async function doesUserHaveOwnReaders(): Promise<boolean> {
  await loadReaders();

  const ownedReaders = readers.value?.filter((reader) => reader.owner === user.value?._id);
  return !!ownedReaders && ownedReaders.length > 0;
}

feathers.on('login', () => {
  void loadReaders();
});
