import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { JansPet } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './JansPets.model';

declare module '../../declarations' {
  interface ServiceTypes {
    JansPets: JansPet & ServiceAddons<JansPet>;
  }
}

class JansPetsService extends Service<JansPet> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
  };
  app.use('/JansPets', new JansPetsService(options, app));
  app.service('JansPets').publish(() => app.channel('anonymous'));
};
