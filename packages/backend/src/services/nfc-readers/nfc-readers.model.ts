import { NFCReader } from '@leek/commons';
import NeDB from 'nedb';
import path from 'path';

import { Application } from '../../declarations';

export default (app: Application): NeDB<NFCReader> => {
  const dbPath = app.get('nedb');
  const model = new NeDB<NFCReader>({
    filename: path.join(dbPath, 'nfc-readers.db'),
    autoload: true,
    inMemoryOnly: process.env.NODE_ENV === 'test',
  });

  return model;
};
