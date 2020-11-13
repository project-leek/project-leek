import NeDB from 'nedb';
import path from 'path';
import { Application } from '../../declarations';
import createModel from './JanPets.model';

export default (app: Application): NeDB<any> => {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'JansPet.db'),
    autoload: true,
  });

  Model.ensureIndex({ fieldName: 'id', unique: true });

  return Model;
};
