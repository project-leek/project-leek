import NFCTag from './nfc-tag.class';

export default class NFCReader {
  private static instance: NFCReader;

  currentTag: NFCTag | undefined;

  private constructor(_currentTag?: NFCTag) {
    this.currentTag = _currentTag;
  }

  public static getInstance(): NFCReader {
    if (!NFCReader.instance) {
      NFCReader.instance = new NFCReader();
    }

    return NFCReader.instance;
  }
}
