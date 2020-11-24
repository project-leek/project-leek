import { AbstractEntity, Ref } from './abstract-entity.class';
import NFCTag from './nfc-tag.class';

export default class NFCReader extends AbstractEntity {
  attachedTag!: Ref<NFCTag> | null;
}
