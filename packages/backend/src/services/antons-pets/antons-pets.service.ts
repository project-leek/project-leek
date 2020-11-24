import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { AntonsPet } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './antons-pets.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'antons-pets': AntonsPetsService & ServiceAddons<AntonsPet>;
  }
}

class AntonsPetsService extends Service<AntonsPet> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('antons-pets', new AntonsPetsService(options, app));

  app.service('antons-pets').publish(() => app.channel('anonymous'));
};
