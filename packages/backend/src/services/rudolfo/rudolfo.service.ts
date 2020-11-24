import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Rudolfo } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './rudolfo.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    rudolfo: RudolfoService & ServiceAddons<Rudolfo>;
  }
}

class RudolfoService extends Service<Rudolfo> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('rudolfo', new RudolfoService(options, app));

  app.service('rudolfo').publish(() => app.channel('anonymous'));
};
