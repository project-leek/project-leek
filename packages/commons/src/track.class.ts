import { AbstractEntity } from './abstract-entity.class';

export default class Track extends AbstractEntity {
  uri!: string;

  title!: string;

  artist!: string;

  imageUri!: string;
}
