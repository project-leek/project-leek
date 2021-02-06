import { AbstractEntity, Ref } from './abstract-entity.class';
import User from './user.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  trackUri!: string;

  name!: string;

  group!: string;

  imageUrl!: string;

  owner!: Ref<User>;
}
