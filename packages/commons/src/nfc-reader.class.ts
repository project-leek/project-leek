import NFCTag from './nfc-tag.class';

export default class NFCReader {
  currentTag: NFCTag | null;

  private constructor(currentTag?: NFCTag | null) {
    this.currentTag = currentTag || null;
  }
}
