import EvdevReader from 'evdev';
import { EventEmitter } from 'events';

declare interface NFCReader {
  on(event: 'tag-attached', listener: (tagId: string) => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
  on(event: 'open', listener: (deviceId: string) => void): this;
}

class NFCReader extends EventEmitter {
  device?: EvdevReader.Device;

  currentTagId: string | null = null;

  reader: EvdevReader;

  constructor() {
    super();

    this.reader = new EvdevReader();

    let tagBuffer = '';

    this.reader.on('EV_KEY', (data) => {
      if (data.value !== 1) {
        return;
      }

      if (data.code === 'KEY_ENTER') {
        this.emit('tag-attached', this.currentTagId);
        this.currentTagId = null;
        return;
      }

      const keyId = data.code.replace(/KEY_/, '');
      tagBuffer = `${tagBuffer}${keyId}`;
    });

    this.reader.on('error', (error) => {
      this.emit('error', error);
    });
  }

  async open(deviceId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.reader.search('/dev/input/by-id', deviceId, (err, files) => {
        if (err) {
          reject(err);
          return;
        }

        if (files.length === 0) {
          reject(new Error('No NFC device found.'));
          return;
        }

        if (files.length > 1) {
          reject(new Error('Multiple NFC devices found. Please specify which one to use.'));
          return;
        }

        if (files.length === 1) {
          this.device = this.reader.open(files[0]);
          this.device.on('open', () => {
            if (!this.device) {
              reject(new Error('Can not find id of opened device.'));
              return;
            }

            this.emit('open', this.device.id);
            resolve(this.device.id);
          });
        }
      });
    });
  }
}

export default NFCReader;
