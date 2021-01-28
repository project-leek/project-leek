import { AbstractEntity, Ref } from './abstract-entity.class';
import User from './user.class';

export default class NFCTag extends AbstractEntity {
  nfcData!: string;

  spotifyTrackUri!: string;

  spotifyImageUrl!: string;

  name!: string;

  trackTitle!: string;

  trackArtists!: string;

  group!: string;

  imageUrl!: string;

  owner!: Ref<User>;
}
