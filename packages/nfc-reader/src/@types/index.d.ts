/* eslint-disable max-classes-per-file */

declare module 'evdev' {
  namespace EvdevReader {
    type ReaderOptions = {
      raw?: boolean;
    };

    enum EventType {
      EV_KEY = 'EV_KEY',
      EV_ABS = 'EV_ABS',
      EV_SYN = 'EV_SYN',
    }

    type Event = {
      type: EvdevEventType;
      code: string;
      value: string | number;
      time: string;
    };

    class Device {
      readonly id: string;

      constructor(stream?: NodeJS.ReadStream);

      init(fd): void;
      on(event: 'open', callback: CallbackFnc);
    }
  }

  class EvdevReader {
    constructor(options?: EvdevReader.ReaderOptions);

    open(device: string | number, callback?: (error: Error | null, fd: any) => EvdevReader.Device): EvdevReader.Device;
    close(): void;
    closeOne(index: number): void;
    search(basedir: string, reg: string, callback: (error: Error | null, files: string[]) => void): void;
    publish(event: EvdevReader.Event): void;
    parse(buf: Buffer): EvdevReader.Event;
    display(event: EvdevReader.Event): EvdevReader.Event;
    on(event: 'error', callback: (error: Error) => void);
    on(event: 'EV_ABS' | 'EV_KEY' | 'EV_SYN', callback: (event: EvdevReader.Event) => void);
    on(event: string, callback: (data: any) => void);
  }

  export default EvdevReader;
}
