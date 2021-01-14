import { AbstractEntity } from './abstract-entity.class';

export default class SpotifyTrack extends AbstractEntity {
  uri!: string;
  title!: string;
  artists!: string[];
  imageUri!: string;

  public getArtists(): string {
    return this.artists.join(', ');
  }
}
