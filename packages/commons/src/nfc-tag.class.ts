import { AbstractEntity } from './abstract-entity.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  trackUri!: string;

  spotifyImageUrl!: string;

  name!: string;

  group!: string;

  imageUrl!: string;
}
