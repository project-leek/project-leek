import { AbstractEntity } from './abstract-entity.class';

export default class NFCTag extends AbstractEntity {
  nfcId!: string;

  audioUrl!: string;
}
