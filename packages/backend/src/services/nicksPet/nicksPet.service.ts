import { ServiceAddons } from '@feathersjs/feathers';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { NicksPet } from '@project-leek/commons';
import { Application } from '../../declarations';
import createModel from './nicksPet.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    nicksPets: NicksPet & ServiceAddons<NicksPet>;
  }
}

class NicksPetService extends Service<NicksPet> {
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
  app.use('nicksPets', new NicksPetService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('nicksPets');

};
