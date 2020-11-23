/* eslint-disable no-console */

import EvdevReader from 'evdev';

const reader = new EvdevReader();

reader.search('/dev/input/by-id', '413d_2107', (err, files) => {
  let device: EvdevReader.Device;

  if (err) {
    console.log('node-evdev search stream:', err);
  } else if (files.length === 1) {
    device = reader.open(files[0]);
    device.on('open', () => {
      console.log(`Connected to NFC device with id: ${device.id}`);
    });
  } else if (files.length === 0) {
    console.error('No NFC device found.');
  } else if (files.length > 1) {
    console.error('Multiple NFC devices found. Please specify which one to use.');
  }
});

let tagId = '';

reader.on('EV_KEY', (data) => {
  console.log(data);

  if (data.value !== 1) {
    return;
  }

  if (data.code === 'KEY_ENTER') {
    console.log('tag:', tagId);
    tagId = '';
    return;
  }

  const keyId = data.code.replace(/KEY_/, '');
  tagId = `${tagId}${keyId}`;
});

reader.on('error', (error) => {
  console.error('NFC reader error:', error);
});
