import { AbstractEntity, Ref } from './abstract-entity.class';
import NFCTag from './nfc-tag.class';
import Speaker from './speaker.class';
import User from './user.class';

export default class NFCReader extends AbstractEntity {
  owner!: Ref<User>;

  name!: string;

  /** The hardware id of an attached tag */
  attachedTagData!: NFCTag['nfcData'] | null;

  selectedSpeaker!: Ref<Speaker>;
}
