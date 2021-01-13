import { AbstractEntity } from './abstract-entity.class';

export default class SpotifyTrack extends AbstractEntity {
  uri: string;
  title: string;
  artists: string[];
  imageUri: string;

  constructor(uri: string, title: string, artists: string[], imageUri: string) {
    super();
    this.uri = uri;
    this.title = title;
    this.artists = artists;
    this.imageUri = imageUri;
  }
}
