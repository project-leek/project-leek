import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons';

import feathers, { socket as feathersSocket } from './lib/feathers';
import NFCReader from './lib/nfc-reader';

const nfcReader = new NFCReader();

function log(message?: unknown, ...optionalParams: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(message, ...optionalParams);
}

function printError(error: Error | string, ...args: string[]) {
  if (typeof error === 'string') {
    // eslint-disable-next-line no-console
    console.error(error, ...args);
  } else {
    // eslint-disable-next-line no-console
    console.error(error.message || error, ...args);
  }
}

async function setAttachedNfcTag(nfcReaderId: string, attachedTag: NFCTag | null) {
  try {
    const tagId = (attachedTag && attachedTag._id) || null;
    await feathers.service('nfc-readers').patch(nfcReaderId, { attachedTag: tagId });
  } catch (_error) {
    const error = _error as Error;
    printError('Could not set attached nfc-tag', error.message);
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
    printError('Could not find nfc-tag.');
    return;
  }

  await setAttachedNfcTag(nfcReaderId, attachedTag);
  log('Attached tag to nfc-reader');

  // reset the attached-tag after 5 seconds as it is normally only attached for a short period of time
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setAttachedNfcTag(nfcReaderId, null); // we do not need to await this promise
    log('Detached tag from nfc-reader');
  }, 1000 * 5);
}

async function start() {
  const nfcReaderId = process.env.NFC_READER_ID || null;
  const apiUrl = process.env.API_URL || null;

  if (!nfcReaderId) {
    printError('Please specify your nfc-reader id with NFC_READER_ID');
    process.exit(-1);
  }

  if (!apiUrl) {
    printError('Please specify your api-url with API_URL');
    process.exit(-1);
  }

  feathersSocket.open();

  nfcReader.on('error', (error) => {
    printError(`NFC reader error: ${error.message}`);
  });

  nfcReader.on('open', (device) => {
    log('Connected to NFC device:', device);
  });

  nfcReader.on('tag-attached', (tagId) => {
    log('Tag attached:', tagId);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateNfcTag(nfcReaderId, tagId); // we do not need to await this promise
  });

  try {
    await nfcReader.open('413d_2107');
  } catch (error) {
    printError(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start(); // this promise should not be awaited
