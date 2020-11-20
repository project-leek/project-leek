const EvdevReader = require('evdev');

const reader = new EvdevReader();

reader.search('/dev/input/by-id', '413d_2107', (err, files) => {
  let device;

  if (err) {
    console.log('node-evdev search stream:', err);
  } else if (files.length === 1) {
    device = reader.open(files[0]);
  } else {
    console.log('No device matching %s found (Possibly multiple devices found)', target_match, files.length);
    return;
  }

  //We don't check if device is assigned because any code path that does not return should assign it.
  device.on('open', () => {
    console.log(device.id);
  });
});

let tagId = '';

reader.on('EV_KEY', async (data) => {
  console.log(data);
  if (data.value !== 1) {
    return;
  }

  if (data.code === 'KEY_ENTER') {
    console.log('tag:', tagId);
    const service = feathers.service('nfc-reader').find({ name: 'Tisch' });
    if (!vorhanden) {

    } else {
      await feathers.service('nfc-reader').patch('', );
    }
    tagId = '';
    return;
  }

  const keyId = data.code.replace(/KEY_/, '');
  tagId = `${tagId}${keyId}`;
}).on('error', (error) => {
  console.log('reader error:', error);
});
