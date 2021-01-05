import { AbstractEntity } from './abstract-entity.class';
import TagGroup from './tag-group.class';

export default class NFCTag extends AbstractEntity {
  nfcId!: string;

  spotifyTrackUri!: string;

  tagGroup!: TagGroup;
}
