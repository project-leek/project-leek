import { User } from '@leek/commons';
import NeDB from 'nedb';
import path from 'path';

import { Application } from '../../declarations';

export default (app: Application): NeDB<User> => {
  const dbPath = app.get('nedb');
  const model = new NeDB<User>({
    filename: path.join(dbPath, 'users.db'),
    autoload: true,
    inMemoryOnly: process.env.NODE_ENV === 'test',
  });

  model.ensureIndex({ fieldName: 'email', unique: true });

  return model;
};
