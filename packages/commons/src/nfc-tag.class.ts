import { AbstractEntity } from './abstract-entity.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  trackUri!: string;

  trackImageUrl!: string;

  name!: string;

  trackTitle!: string;

  trackArtists!: string;

  group!: string;

  imageUrl!: string;
}
