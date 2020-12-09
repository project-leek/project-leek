import { AbstractEntity } from './abstract-entity.class';

export default class User extends AbstractEntity {
  email!: string;

  name?: string;

  spotifyAccessToken?: string;

  spotifyRefreshToken?: string;

  avatar?: string;
}
