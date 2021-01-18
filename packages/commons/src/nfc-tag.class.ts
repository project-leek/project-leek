import { AbstractEntity } from './abstract-entity.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  spotifyTrackUri!: string;

  spotifyImageUrl!: string;

  name!: string;

  group!: string;

  activeImageUrl!: string;
}
