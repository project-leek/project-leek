import { NFCTag } from '@leek/commons';
import NeDB from 'nedb';
import path from 'path';

import { Application } from '../../declarations';

export default (app: Application): NeDB<NFCTag> => {
  const dbPath = app.get('nedb');
  const model = new NeDB<NFCTag>({
    filename: path.join(dbPath, 'nfc-tags.db'),
    autoload: true,
    inMemoryOnly: process.env.NODE_ENV === 'test',
  });

  model.ensureIndex({ fieldName: 'nfcData', unique: true });

  return model;
};
