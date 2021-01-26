import { AbstractEntity } from './abstract-entity.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  spotifyTrackUri!: string;

  imageUrl!: string;

  name!: string;

  trackTitle!: string;

  trackArtists!: string;

  group!: string;
}
