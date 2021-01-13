import { ServiceAddons } from '@feathersjs/feathers';
import { User } from '@leek/commons';
import { NedbServiceOptions, Service } from 'feathers-nedb';

import { Application } from '../../declarations';
import hooks from './users.hooks';
import createModel from './users.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    users: UsersService & ServiceAddons<User>;
  }
}

class UsersService extends Service<User> {
  constructor(options: Partial<NedbServiceOptions>) {
    super(options);
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('users', new UsersService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');
  service.hooks(hooks);
};
