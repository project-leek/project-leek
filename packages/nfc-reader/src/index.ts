import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@project-leek/commons';

import NFCReader from './lib/nfc-reader';
import feathers, { socket as feathersSocket } from './lib/feathers';

const nfcReader = new NFCReader();

async function setAttachedNfcTag(nfcReaderId: string, attachedTag: NFCTag | null) {
  try {
    await feathers.service('nfc-readers').patch(nfcReaderId, { attachedTag });
  } catch (error) {
    console.error('Could not set attached nfc-tag');
  }
}

async function updateNfcTag(nfcReaderId: string, tagId: string) {
  let attachedTag: NFCTag | null = null;

  try {
    const nfcTagFind = (await feathers.service('nfc-tags').find({ query: { nfcId: tagId } })) as Paginated<NFCTag>;

    if (nfcTagFind && nfcTagFind.data && nfcTagFind.data.length === 1) {
      [attachedTag] = nfcTagFind.data;
    }
  } catch (error) {
    // ignore
  }

  if (!attachedTag) {
    console.error('Could not find nfc-tag.');
  }

  await setAttachedNfcTag(nfcReaderId, attachedTag);
  console.log('Attached tag to nfc-reader');

  // reset the attached-tag after 5 seconds as it is normally only attached for a short period of time
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setAttachedNfcTag(nfcReaderId, null); // we do not need to await this promise
    console.log('Detached tag from nfc-reader');
  }, 1000 * 5);
}

async function start() {
  const nfcReaderId = process.env.NFC_READER_ID || null;
  const apiUrl = process.env.API_URL || null;

  if (!nfcReaderId) {
    console.error('Please specify your nfc-reader id with NFC_READER_ID');
    process.exit(-1);
  }

  if (!apiUrl) {
    console.error('Please specify your api-url with API_URL');
    process.exit(-1);
  }

  feathersSocket.open();

  nfcReader.on('error', (error) => {
    console.error('NFC reader error:', error);
  });

  nfcReader.on('open', (deviceId) => {
    console.log('Connected to NFC device with id:', deviceId);
  });

  nfcReader.on('tag-attached', (tagId) => {
    console.log('Tag attached:', tagId);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateNfcTag(nfcReaderId, tagId); // we do not need to await this promise
  });

  try {
    await nfcReader.open('413d_2107');
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start(); // this promise should not be awaited
