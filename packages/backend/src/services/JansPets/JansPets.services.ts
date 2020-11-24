import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { JansPet } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './JansPets.model';

declare module '../../declarations' {
  interface ServiceTypes {
    'jans-pets': JansPet & ServiceAddons<JansPet>;
  }
}

class JansPetsService extends Service<JansPet> {
  constructor(options: Partial<NedbServiceOptions>) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
  };
  app.use('jans-pets', new JansPetsService(options));
  app.service('jans-pets').publish(() => app.channel('anonymous'));
};
