export abstract class AbstractEntity {
  readonly _id!: string;

  static createRef<T extends AbstractEntity>(id: string): Ref<T> {
    return { _id: id };
  }
}

export type Ref<T extends AbstractEntity> = T | Pick<T, '_id'>;
