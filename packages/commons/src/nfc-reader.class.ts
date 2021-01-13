import { AbstractEntity, Ref } from './abstract-entity.class';
import NFCTag from './nfc-tag.class';
import User from './user.class';

export default class NFCReader extends AbstractEntity {
  /** The hardware id of an attached tag */
  attachedTagData!: NFCTag['nfcData'] | null;

  owner!: Ref<User>;
}
