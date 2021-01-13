import feathers, { socket as feathersSocket } from './lib/feathers';
import NFCReader from './lib/nfc-reader';

const nfcReader = new NFCReader();

function log(message?: unknown, ...optionalParams: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(message, ...optionalParams);
}

function printError(error: Error | string, ...args: string[]): void {
  if (typeof error === 'string') {
    // eslint-disable-next-line no-console
    console.error(error, ...args);
  } else {
    // eslint-disable-next-line no-console
    console.error(error.message || error, ...args);
  }
}

async function updateAttachedTagData(nfcReaderId: string, tagData: string | null): Promise<void> {
  try {
    await feathers.service('nfc-readers').patch(nfcReaderId, { attachedTagData: tagData });
  } catch (error) {
    printError('Could not set attached nfc-tag', (error as Error).message);
    return;
  }

  log('Attached tag to nfc-reader');

  // reset the attached-tag after 5 seconds as it is normally only attached for a short period of time
  setTimeout(() => {
    void updateAttachedTagData(nfcReaderId, null);
    log('Detached tag from nfc-reader');
  }, 1000 * 5);
}

async function start(): Promise<void> {
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

  nfcReader.on('tag-attached', (tagData) => {
    log('Tag attached:', tagData);
    void updateAttachedTagData(nfcReaderId, tagData);
  });

  try {
    await nfcReader.open('413d_2107');
  } catch (error) {
    printError(error);
  }
}

void start();
